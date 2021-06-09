<template>
  <v-app class="main-view">
    <MobileBar v-if="$adaptive.isMobile" :userId="user.id" :user-info="user"/>
    <BottomBar v-if="$adaptive.isMobile" @addCandidate="addCandidate" @addTask="activatorTask = true"/>
    <v-main class="main-view__container pt-4">
      <v-container class="fluid-container" fluid>
        <div class="aside-view mr-7" v-if="!$adaptive.isMobile">
          <Sidebar :userInfo="user" :userId="user.id" :unReadMessages="unReadMessages" @proceed="proceed" @open="activatorTask = true"/>
          <Banner v-if="user.subscription.isActual === null" @show="activator = true"/>
        </div>
        <div class="content-main pt-0 mb-16">
          <v-main class="pb-7">
            <v-col class="py-0" v-if="!user.isEmailConfirmed && !$route.query.accountId">
              <Confirm
                  :text="`Мы отправили на почту ${user.email} письмо с ссылкой на подтверждение. Пожалуйста, откройте Вашу почту и перейдите по ссылке в письме.`"
                  @show="showNote"
                  :show="show"
                  @submit="sendCode"
              />
            </v-col>
            <Alert :show="showAlertTemp" :type="type" :text="text" @show="showAlertTempAction"/>
            <router-view></router-view>
          </v-main>
        </div>
      </v-container>
      <v-tour name="tour" :steps="steps" :options="options"></v-tour>
      <Modal :activator="activator" :max-width="1000" @activatorChange="activatorChange" color="#F2F2F2">
        <template v-slot:content>
          <SubscribeFormalization/>
        </template>
      </Modal>
      <Modal :activator="activatorCandidate" :full-screen="$adaptive.isMobile" @activatorChange="activatorCandidateChange">
        <template v-slot:content>
          <CandidateFormComponent :form="candidateForm" v-if="destroy" :statuses="statuses" :info-packs="infoPackages"
                                  :account-id="user.id" @close="close" @add="add"/>
        </template>
      </Modal>
      <Modal :activator="activatorTask" :full-screen="$adaptive.isMobile" @activatorChange="activatorTaskChange">
        <template v-slot:content>
          <AddTask v-if="activatorTask" @close="closeTask"/>
        </template>
      </Modal>
    </v-main>
    <Footer/>
  </v-app>
</template>
<script lang="ts">
import {Component, Vue, Watch} from 'vue-property-decorator';
import {AuthStore} from '@/store/modules/Auth';
import {IUser} from '@/entity/user';
import MobileBar from '@/UI/components/common/MobileBar.vue';
import Banner from '../components/common/Banner.vue';
import Sidebar from '../components/sidebar/Sidebar.vue';
import {ITourOptions, ITourSteps} from '../../entity/common/tour.types';
import {TourStore} from '../../store/modules/Tour';
import Confirm from '../components/common/Confirm.vue';
import {ConfirmEmailStore} from '../../store/modules/ConfirmEmail';
import {AlertTypeEnum} from '../../entity/common/alert.types';
import Alert from '../components/common/Alert.vue';
import Error from '../components/common/banners/Error.vue';
import {startIntercomMessenger} from '../../plugins/Intercom';
import Modal from '../components/common/Modal.vue';
import SubscribeFormalization from '../components/subscribeFormalization/SubscribeFormalization.vue';
import { WebSocketStore } from '@/store/modules/WebSocket';
import { IDialogs } from '@/entity/dialogs/dialogs.types';
import { DialogsStore } from '@/store/modules/Dialogs';
import Footer from '../components/common/footer/Footer.vue';
import {CandidateForm} from '../../form/candidate/candidateForm';
import {IStatuses} from '../../entity/statuses/statuses.types';
import {StatusesStore} from '../../store/modules/Statuses';
import {InfoPackagesStore} from '../../store/modules/InfoPackages';
import {IInfoPackage} from '../../entity/infoPackages/infoPackage.types';
import {CandidatesStore} from '../../store/modules/Candidates';
import {RouterNameEnum} from '../../router/router.types';
import CandidateFormComponent from '../components/forms/candidateForm/CandidateFormComponent.vue';
import {eventBus} from '../../main';
import BottomBar from '../components/common/BottomBar.vue';
import { MessagesStore } from '@/store/modules/Messages';
import { IMessages } from '@/entity/messages/messages.types';
import TaskInput from '../components/todo/taskInput/TaskInput.vue';
import AddTask from '../components/todo/addTask/AddTask.vue';



@Component({
  components: {
    AddTask,
    TaskInput,
    BottomBar,
    CandidateFormComponent,
    Footer,
    SubscribeFormalization,
    Modal,
    Error,
    Alert,
    Confirm,
    Banner,
    MobileBar,
    Sidebar
  },
})
export default class MainLayout extends Vue {
  showAlertTemp = false;
  type = '';
  text = '';
  activator = false;
  activatorCandidate = false;
  activatorTask = false;
  show = true;
  alertType = AlertTypeEnum;
  destroy = true;
  candidateForm = new CandidateForm();

  @Watch('$route.name')
  scrollTop(val: string, oldVal: string): void {
    if(val !== oldVal && this.$adaptive.isMobile){
        window.scroll(0, 0);
    }
  }

  rerender(): void {
    this.destroy = false;
    this.$nextTick(() => {
      this.destroy = true;
    });
  }



  showAlertTempAction(show: boolean): void {
    this.showAlertTemp = show;
  }

  closeTask(): void {
    this.activatorTask = false;
  }


  created(): void {
      DialogsStore.fetchAll()
      StatusesStore.fetchAll();
      InfoPackagesStore.fetchAll();
      startIntercomMessenger(AuthStore.user!);
      WebSocketStore.setConnection();
      eventBus.$on('showAlert', (data: any) => {
        this.showAlertTemp = data.show;
        this.type = data.type;
        this.text = data.text;
      })

    this.socket!.onclose = (e: any) => {
        setTimeout(() => {
           WebSocketStore.setConnection();
        }, 2000);
    };

    this.socket!.onmessage =  async (e) => {
      const {data} = JSON.parse(e.data)
      data.is_read = !data.is_my && ( this.$route.name === (this.$routeRules.ChatMain || this.$routeRules.Course)) && this.$route.params.id === data.account_id.toString() ? true : false;
      MessagesStore.addMessage(data);


      if(data.is_my) {
        if(this.$route.name === this.$routeRules.Course) {
          const container =  await document.getElementById('chatContainer');
          container!.scrollTop = await container!.scrollHeight;
        }

        if(this.$route.name === this.$routeRules.ChatMain) {
           const container =  await document.getElementById('chatDialogContainer');
           container!.scrollTop = await container!.scrollHeight;

        }
      }

      if(!data.is_my) {
        if(this.$route.params.id !== data.account_id.toString() && this.$route.name !== this.$routeRules.ChatMain){
          DialogsStore.setUnReadMessage({count: 1, operation: 'plus'});
        }


         if(this.$route.name === this.$routeRules.Course) {
          const container =  await document.getElementById('chatContainer');
          container!.scrollTop = await container!.scrollHeight;
        }

        if(this.$route.name === this.$routeRules.ChatMain) {
          if(this.$route.params.id === data.account_id.toString()) {

          }
           const container =  await document.getElementById('chatDialogContainer');
           container!.scrollTop = await container!.scrollHeight;

        }
      }

    }

  }

  get socket(): WebSocket | null {
    return WebSocketStore.socket;
  }

  addCandidate(): void {
    this.activatorCandidate = true;
  }

  get infoPackages(): IInfoPackage[] {
    return InfoPackagesStore.infoPackages;
  }

  get messages(): IMessages[] {
    return MessagesStore.messages
  }

  get statuses(): IStatuses[] {
    return StatusesStore.statuses;
  }

  get user(): IUser | null {
    return AuthStore.user;
  }

  get options(): ITourOptions {
    return TourStore.options;
  }

  get steps(): ITourSteps[] {
    return TourStore.steps;
  }

  get dialogs(): IDialogs[] {
    return DialogsStore.dialogs;
  }

  get unReadMessages(): number {
    return DialogsStore.unReadMessages;
  }

  proceed(): void {
    this.$router.push({name: this.$routeRules.Profile});
  }

  showNote(show: boolean): void {
    this.show = show;
  }


  close(): void {
    this.activatorCandidate = false;
  }

  activatorCandidateChange(act: boolean): void {
    this.activatorCandidate = act;
  }

  activatorChange(act: boolean): void {
    this.activator = act;
  }

  activatorTaskChange(act: boolean): void {
    this.activatorTask = act;
  }

  async add(): Promise<void> {
    const date = new Date(this.candidateForm.callTimeFake);
    const seconds = date.getTime() / 1000;
    this.candidateForm.callTime = seconds;
    if (await this.candidateForm.submit(CandidatesStore.create)) {
      this.candidateForm = new CandidateForm();
      this.rerender();
      this.activatorCandidate = false;
      if (this.$route.name !== RouterNameEnum.Candidates) {
        await this.$router.push({name: RouterNameEnum.Candidates});
      }
    }
  }

  async mounted(): Promise<void> {
    if (localStorage.getItem('newUser')) {
      await this.$tours['tour'].start();
      localStorage.removeItem('newUser');
    }
  }

  async sendCode(): Promise<boolean> {
    await ConfirmEmailStore.sendCode({email: this.user!.email});
    this.type = this.alertType.Success;
    this.text = 'Ссылка успешно отправлена';
    this.showAlertTemp = true;
    return true
  }



}
</script>
<style lang="scss">
.main-view {
  font-family: 'Inter', sans-serif !important;
  width: 100%;

  &__container {
    max-width: 1440px;
    background-color: #fbfcfe;
  }
}

.aside-view {
  min-width: 290px;
}

.content-main {
  width: 100%;
  min-width: 0;
  padding-top: 10px !important;
}

.fluid-container {
  max-width: 1440px !important;
}
</style>

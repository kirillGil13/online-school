<template>
  <v-app class="main-view">
    <MobileBar v-if="$adaptive.isMobile" :userId="user.id" :user-info="user"/>
    <v-main class="main-view__container pt-4">
      <v-container class="fluid-container" fluid>
        <div class="aside-view mr-7" v-if="!$adaptive.isMobile">
          <Sidebar :userInfo="user" :userId="user.id" :countUnreadMessages="unReadMessages" @proceed="proceed"/>
          <Banner v-if="!user.isSubscriptionActual" @show="activator = true"/>
        </div>
        <div class="content-main pt-0 mb-16">
          <v-main>
            <v-col class="py-0" v-if="!user.isEmailConfirmed && !$route.query.accountId">
              <Confirm
                  :text="`Мы отправили на почту ${user.email} письмо с ссылкой на подтверждение. Пожалуйста, откройте вашу почту и перейдите по ссылке в письме.`"
                  @show="showNote"
                  :show="show"
                  @submit="sendCode"
              />
            </v-col>
            <Alert :show="success" :type="alertType.Success" text="Ссылка успешно отправлена" @show="showAlert"/>
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
    </v-main>
  </v-app>
</template>
<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';
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


@Component({
  components: {
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
  activator = false;
  show = true;
  success = false;
  alertType = AlertTypeEnum;
  
  showAlert(show: boolean): void {
    this.success = show;
  }

  proceed(): void {
    this.$router.push({name: this.$routeRules.Profile});
  }

  showNote(show: boolean): void {
    this.show = show;
  }

  created(): void {
      DialogsStore.fetchAll()
      startIntercomMessenger(AuthStore.user!);
      WebSocketStore.setConnection();


      this.socket!.onmessage = (() => {
        console.log('asda')
        DialogsStore.setUnReadMessage(1, true);
      })
  }

  activatorChange(act: boolean): void {
    this.activator = act;
  }

  get socket(): WebSocket | null {
    return WebSocketStore.socket;
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

  async mounted(): Promise<void> {
    if (TourStore.newUser) {
      this.$tours['tour'].start();
    }
  }

  async sendCode(): Promise<boolean> {
    const res = await ConfirmEmailStore.sendCode({email: this.user!.email});
    if (res) {
      this.success = true;
      return true
    } else return false;
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

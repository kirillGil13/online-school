<template>
  <v-col class="infoPackageItem" v-if="infoPackageItemLoaded">
    <div class="main-video-wrapper">
      <InfoPackageItemVideoComponent :class="['main-video', $adaptive.isMobile ? 'mobile' : '']"
                                     :info-package-item-video="infoPackageItem.mainVideo"
                                     @open="activatorMainVideo = true"/>
    </div>
    <div class="videos" v-if="infoPackageItemLoaded">
      <InfoPackageItemVideoComponent :class="['secondary-video', $adaptive.isMobile ? 'mobile' : '']"
                                v-for="(item, index) in infoPackageItem.videos" :key="index"
                                     :info-package-item-video="item" @open="open"/>
    </div>
    <Modal :activator="activator" v-if="destroy" @activatorChange="activatorChange">
      <template v-slot:content>
        <VideoAccessFormComponent v-if="!codeStep" :form="accessForm" @close="close" @access="submitPhone"
                                  :account-id="+$route.query.account_id" :info-pack-id="+$route.params.id"/>
        <v-col class="pa-6 text-center" v-else>
          <h1 class="mx-auto my-0">Получить доступ к видео</h1>
          <CodeFormVue :form="codeForm" :show-alert="show" @submitCode="submitCode" @sendAgain="submitPhone"/>
        </v-col>
      </template>
    </Modal>
    <Modal v-if="infoPackageItemLoaded" :video-modal="true" :activator="activatorMainVideo"
           @activatorChange="activatorMainVideoChange">
      <template v-slot:content>
        <iframe v-if="destroyVideo" id="ytplayer1" ref="ytp" width="100%" height="340"
                :src="infoPackageItemLoaded ? infoPackageItem.mainVideo.videoLink : ''"
                frameborder="0" allowfullscreen />
      </template>
    </Modal>
    <Modal v-if="infoPackageItemLoaded" :video-modal="true" :activator="activatorVideo"
           @activatorChange="activatorVideoChange">
      <template v-slot:content>
        <iframe v-if="destroyVideo" id="ytplayer2" type="text/html" width="100%" height="340"
                :src="infoPackageItemLoaded ? infoPackageItem.videos.find(item => item.id === secondaryVideoId).videoLink : ''"
                frameborder="0" allowfullscreen/>
      </template>
    </Modal>
    <Alert :show="show" :type="alertType.Success"
           text="Код успешно отправлен"
           @show="showAlert"/>
  </v-col>
</template>

<script lang="ts">
import {Component, Vue, Watch} from 'vue-property-decorator';
import CourseComponent from '../components/course/CourseComponent.vue';
import InfoPackageItemVideoComponent from '../components/infoPackageItemVideo/InfoPackageItemVideoComponent.vue';
import {InfoPackagesStore} from '../../store/modules/InfoPackages';
import {IInfoPackageItem} from '../../entity/infoPackageItem/infoPackageItem.types';
import {VideoAccessForm} from '../../form/videoAccess/videoAccessForm';
import Modal from '../components/common/Modal.vue';
import VideoAccessFormComponent from '../components/forms/videoAccessForm/VideoAccessFormComponent.vue';
import {AccessVideoStore} from '../../store/modules/AccessVideo';
import {AlertTypeEnum} from '../../entity/common/alert.types';
import {CandidatesStore} from '../../store/modules/Candidates';
import {CodeForm} from '../../form/code/codeForm';
import Alert from '../components/common/Alert.vue';
import CodeFormVue from '../components/forms/auth/CodeForm.vue';
import {VideoOptionsStore} from '../../store/modules/VideoOptions';
import {IVideoOptions} from '../../entity/common/videoOptions.types';

@Component({
  components: {CodeFormVue, Alert, VideoAccessFormComponent, Modal, InfoPackageItemVideoComponent, CourseComponent}
})
export default class Landing extends Vue {
  activator = false;
  activatorMainVideo = false;
  activatorVideo = false;
  destroy = true;
  destroyVideo = true;
  secondaryVideoId = 1;
  accessForm = new VideoAccessForm();
  codeForm = new CodeForm();
  alertType = AlertTypeEnum;
  show = false;
  codeStep = false;

  @Watch('activatorMainVideo')
  onMainActivatorChange(): void {
    if (this.activatorMainVideo) {
      this.destroyVideo = true;
    } else this.destroyVideo = false;
  }

  @Watch('activatorVideo')
  onSecondActivatorChange(): void {
    if (this.activatorVideo) {
      this.destroyVideo = true;
    } else this.destroyVideo = false;
  }

  get infoPackageItem(): IInfoPackageItem {
    return InfoPackagesStore.infoPackageItem!;
  }

  get infoPackageItemLoaded(): boolean {
    return InfoPackagesStore.infoPackageItemLoaded;
  }

  get options(): IVideoOptions {
    return VideoOptionsStore.options;
  }

  open(id: number): void {
    this.secondaryVideoId = id;
    if (this.$cookies.get('username')) {
      this.destroy = false;
      this.activatorVideo = true;
    } else {
      this.activator = true;
      this.destroy = true;
    }
  }

  close(): void {
    this.activator = false;
  }

  activatorChange(act: boolean): void {
    this.destroy = true;
    this.activator = act;
  }

  showAlert(show: boolean): void {
    this.show = show;
  }

  activatorVideoChange(act: boolean): void {
    this.activatorVideo = act;
  }

  activatorMainVideoChange(act: boolean): void {
    this.activatorMainVideo = act;
  }

  async submitPhone(again?: boolean): Promise<boolean> {
    // eslint-disable-next-line @typescript-eslint/camelcase
    const res = await CandidatesStore.sendCode({phone_number: this.accessForm.phone});
    if (!again) {
      if (res) {
        this.accessForm.clearErrors();
        this.codeStep = true;
        this.codeForm.phone = this.accessForm.phone;
        return true;
      } else {
        this.codeStep = false;
        return false;
      }
    } else {
      if (res) {
        this.show = true;
        return true;
      }
      return false;
    }
  }

  async submitCode(): Promise<boolean> {
    const res = await this.codeForm.submit(CandidatesStore.checkCode);
    if (res) {
      await this.access();
      return true;
    } else return false;
  }

  async access(): Promise<void> {
    if (await this.accessForm.submit(AccessVideoStore.getAccess)) {
      this.$cookies.set('username', this.accessForm.phone);
      this.destroy = false;
      this.activator = false;
      this.activatorVideo = true;
    }
  }

  async created(): Promise<void> {
    await InfoPackagesStore.fetchData({
      accountId: this.$route.query.account_id.toString(),
      route: this.$route.params.id.toString()
    });
  }
}
</script>

<style lang="scss">
.infoPackageItem {
  .main-video-wrapper {
    display: flex;
    justify-content: center;

    .main-video {
      margin-right: 0;
      width: 80%;

      .course-video-block {
        height: 425px;
      }

      &.mobile {
        width: 100%;

        .course-video-block {
          height: 225px !important;
        }
      }

      .course-title {
        font-size: 36px !important;
      }
    }
  }

  .videos {
    margin-top: 60px;
    display: flex;
    justify-content: space-between;
    flex-direction: row;
    flex-wrap: wrap;

    .secondary-video {
      margin-right: 16px;
      margin-top: 16px;
      &:nth-child(3n+3) {
        margin-right: 0;
      }
      &.mobile {
        margin-right: 0;
        margin-top: 24px;
        width: 100%;

        .course-video-block {
          height: 225px !important;
        }
      }
    }
  }
}
</style>

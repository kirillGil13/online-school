<template>
  <v-col class="infoPackageItem" v-if="infoPackageItemLoaded">
    <div class="main-video-wrapper">
      <InfoPackageItemVideoComponent :class="['main-video', isMobile ? 'mobile' : '']" :info-package-item-video="infoPackageItem.mainVideo" @open="activatorVideo = true; mainVideo = true"/>
    </div>
    <div class="videos" v-if="infoPackageItemLoaded">
      <InfoPackageItemVideoComponent :class="['secondary-video', isMobile ? 'mobile' : '']" v-for="(item, index) in infoPackageItem.videos" :key="index"
                                     :info-package-item-video="item" @open="open"/>
    </div>
    <Modal :activator="activator" v-if="destroy" @activatorChange="activatorChange">
      <template v-slot:content>
        <VideoAccessFormComponent :form="accessForm"  @close="close" @access="access" :account-id="+$route.query.account_id" :info-pack-id="+$route.params.id"/>
      </template>
    </Modal>
    <Modal :video-modal="true" :activator="activatorVideo" @activatorChange="activatorVideoChange">
      <template v-slot:content v-if="mainVideo">
        <iframe id="ytplayer1" width="100%" height="340"
                :src="infoPackageItemLoaded ? infoPackageItem.mainVideo.videoLink : ''"
                frameborder="0"/>
      </template>
      <template v-slot:content v-else>
        <iframe id="ytplayer2" type="text/html" width="100%" height="340"
                :src="infoPackageItemLoaded ? infoPackageItem.videos.find(item => item.id === secondaryVideoId).videoLink : ''"
                frameborder="0"/>
      </template>
    </Modal>
  </v-col>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';
import CourseComponent from '../components/course/CourseComponent.vue';
import InfoPackageItemVideoComponent from '../components/infoPackageItemVideo/InfoPackageItemVideoComponent.vue';
import {InfoPackagesStore} from '../../store/modules/InfoPackages';
import {IInfoPackageItem} from '../../entity/infoPackageItem/infoPackageItem.types';
import {VideoAccessForm} from '../../form/videoAccess/videoAccessForm';
import Modal from '../components/common/Modal.vue';
import VideoAccessFormComponent from '../components/forms/videoAccessForm/VideoAccessFormComponent.vue';
import {AccessVideoStore} from '../../store/modules/AccessVideo';
import {AdaptiveStore} from '../../store/modules/Adaptive';

@Component({
  components: {VideoAccessFormComponent, Modal, InfoPackageItemVideoComponent, CourseComponent}
})
export default class Landing extends Vue {
  activator = false;
  activatorVideo = false;
  destroy = true;
  mainVideo = false;
  secondaryVideoId = 1;
  accessForm: VideoAccessForm;

  constructor() {
    super();
    this.accessForm = new VideoAccessForm();
  }

  open(id: number): void {
    this.secondaryVideoId = id;
    if (this.$cookies.get('username')) {
      this.destroy = false;
      this.activatorVideo = true;
    }else {
      this.activator = true;
      this.destroy = true;
    }
  }
  activatorChange(act: boolean): void {
    this.destroy = true;
    this.activator = act;
  }
  activatorVideoChange(act: boolean): void {
    this.activatorVideo = act;
    this.mainVideo = false;
  }
  async access(): Promise<void> {
    if (await this.accessForm.submit(AccessVideoStore.getAccess)) {
      this.$cookies.set('username', this.accessForm.phone);
      this.destroy = false;
      this.activator = false;
      this.activatorVideo = true;
    }
  }

  close(): void {
    this.activator = false;
  }

  get infoPackageItem(): IInfoPackageItem {
    return InfoPackagesStore.infoPackageItem!;
  }

  get isMobile(): boolean {
    return AdaptiveStore.isMobile;
  }

  get infoPackageItemLoaded(): boolean {
    return InfoPackagesStore.infoPackageItemLoaded;
  }

  async created(): Promise<void> {
    await InfoPackagesStore.fetchData(this.$route.params.id);
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
      &.mobile {
        margin-right: 0;
        width: 100%;
        .course-video-block {
          height: 225px !important;
        }
      }
    }
  }
}
</style>
<template>
  <div :class="['course-block', isMobile ? 'course-mobile' : '']">
    <div class="course-video-block" @click="$emit('proceed', infoPackage.id)">
      <v-img class="course-image" :src="infoPackage.coverLink" max-width="100%" height="100%" :aspect-ratio="16/9">
        <template v-slot:placeholder>
          <CourseSkeleton/>
        </template>
        <div class="course-info-container">
          <div class="course-info progress">
            <div class="text">
              <svg-icon name="Chart"></svg-icon>{{infoPackage.countViews}}
              <svg-icon name="Pack_Add_User"></svg-icon>{{infoPackage.countCandidates}}
            </div>
          </div>
          <div class="share">
            <svg-icon v-clipboard="infoPackage.sharedLink" name="Share"></svg-icon>
          </div>
        </div>
      </v-img>
    </div>
    <div class="course-title">{{ infoPackage.name }}</div>
    <div class="course-download" v-clipboard="infoPackage.sharedLink" @click="$emit('copied')">
      <svg-icon class="svg-wh" name="Copy" />
      <span>Скопировать ссылку</span>
    </div>
  </div>
</template>
<script lang="ts">
import {Component, Prop, Vue} from 'vue-property-decorator'
import {IInfoPackage} from '../../../entity/infoPackages/infoPackage.types';
import {AdaptiveStore} from '../../../store/modules/Adaptive';
import CourseSkeleton from '../common/skeletons/courseSkeleton/CourseSkeleton.vue';
@Component({
  components: {CourseSkeleton}
})
export default class InfoPackageComponent extends Vue {
  @Prop() readonly infoPackage!: IInfoPackage;

  get isMobile(): boolean {
    return AdaptiveStore.isMobile;
  }
}
</script>
<style lang="scss">
.course-info {
  &.progress {
    padding-top: 1px !important;
    padding-bottom: 1px !important;
    .text {
      margin-left: 0 !important;
      .svg-icon {
        margin-right: 2px;
        width: 16px !important;
        height: 16px !important;
        &:nth-child(2) {
          margin-left: 4px !important;
        }
      }
    }
  }
}
.course-download {
  margin-top: 11px;
  .svg-wh {
    width: 24px !important;
    height: 24px !important;
  }
}
</style>

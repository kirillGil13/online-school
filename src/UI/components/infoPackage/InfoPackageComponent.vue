<template>
  <div :class="['course-block', isMobile ? 'course-mobile' : '']">
    <div class="course-video-block" @click="$emit('proceed', infoPackage.id)" :style="{ backgroundImage: 'url(' + infoPackage.coverLink + ')' }">
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
    <div class="course-title">{{ infoPackage.name }}</div>
    <div class="course-download">
      <svg-icon v-clipboard="infoPackage.sharedLink" class="svg-wh" name="Copy" />
      <span v-clipboard="infoPackage.sharedLink">Скопировать ссылку</span>
    </div>
  </div>
</template>
<script lang="ts">
import {Component, Prop, Vue} from 'vue-property-decorator'
import {IInfoPackage} from '../../../entity/infoPackages/infoPackage.types';
import {AdaptiveStore} from '../../../store/modules/Adaptive';

@Component
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

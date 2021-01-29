<template>
  <div class="course-block" @click="$emit('proceed', infoPackage.id)">
    <div class="course-video-block" :style="{ backgroundImage: 'url(' + infoPackage.cover + ')' }">
      <div class="course-info progress">
        <div class="text">
          <svg-icon name="Chart"></svg-icon>{{infoPackage.openCount}}
          <svg-icon name="Pack_Add_User"></svg-icon>{{infoPackage.registerCount}}
        </div>
      </div>
      <div class="share">
          <svg-icon name="Share"></svg-icon>
      </div>
    </div>
    <div class="course-title">{{ infoPackage.title }}</div>
    <div class="course-download">
      <svg-icon v-clipboard="infoPackage.link" class="svg-wh" name="Copy" />
      <span v-clipboard="infoPackage.link">Скопировать ссылку</span>
    </div>
  </div>
</template>
<script lang="ts">
import {Component, Prop, Vue} from 'vue-property-decorator'
import {IInfoPackage} from '../../../entity/infoPackage/infoPackage.types';

@Component
export default class InfoPackageComponent extends Vue {
  @Prop() readonly infoPackage!: IInfoPackage;
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

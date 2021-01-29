<template>
    <div class="course-block" @click="$emit('proceed', presentation.id)">
      <div class="course-video-block" :style="{ backgroundImage: 'url(' + presentation.cover + ')' }">
        <div class="course-info progress">
          <div class="text"><svg-icon name="DownLoad_Cloud"></svg-icon>24</div>
        </div>
        <div class="share"><svg-icon name="Share"></svg-icon></div>
      </div>
      <div class="course-title">{{ presentation.name }}</div>
      <div class="course-description">{{presentation.description}}</div>
      <div class="course-download">
        <svg-icon class="svg-wh" name="DownLoad"></svg-icon>
        Скачать презентацию ({{presentation.fileSize}} КБ)
      </div>
    </div>
</template>

<script lang="ts">
import {Component, Prop, Vue} from 'vue-property-decorator'
import {IPresentation} from '@/entity/presentations/presentation.types';

@Component
export default class PresentationComponent extends Vue {
  @Prop() readonly presentation!: IPresentation;
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

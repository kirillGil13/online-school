<template>
  <div class="d-flex flex-column mt-3">
    <div class="progress-course d-flex flex-row flex-wrap">
      <div class="course mr-4" :style="{backgroundImage: 'url(' + cover + ')'}"></div>
      <div class="course-info-progress">
        <div class="progress-lessons" :style="{color: passed ? '#27AE60' : ''}">
          <svg-icon v-if="passed" name="Done"></svg-icon>
          Урок {{lessonsPassed}} из {{totalLessons}}
        </div>
        <div class="progress-title">{{title}}</div>
      </div>
    </div>
    <slot name="append"></slot>
  </div>
</template>

<script lang="ts">
import {Component, Prop, Vue} from 'vue-property-decorator';

@Component
export default class ProgressCourse extends Vue {
  @Prop() readonly cover!: string;
  @Prop() readonly totalLessons!: number;
  @Prop() readonly lessonsPassed!: number;
  @Prop() readonly title!: string;

  get passed(): boolean {
    return this.lessonsPassed === this.totalLessons;
  }
}
</script>

<style lang="scss">
.progress-course {
  .course {
    width: 160px;
    height: 90px;
    background-size: cover;
    border: 1px solid rgba(0, 0, 0, 0.04);
    border-radius: 8px;
  }
  .course-info-progress {
    .progress-lessons {
      font-size: 14px;
      color: #426DF6;
      .svg-icon {
        width: 16px !important;
        height: 16px !important;
      }
    }
    .progress-title {
      font-size: 16px;
    }
  }
}
</style>
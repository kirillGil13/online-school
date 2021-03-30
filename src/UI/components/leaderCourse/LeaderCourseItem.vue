<template>
  <div :class="['course-block', isMobile ? 'course-mobile' : '']">
    <div class="course-video-block" @click="$emit('proceed', course.id)">
      <v-img class="course-image" :src="course.photoLink" max-width="100%" height="100%" :aspect-ratio="16/9">
        <div class="course-info-container">
          <div class="course-info progress" v-if="course.progress">
            <ProgressCircle :progress="course.progress" color="#27AE60" empty-color="rgba(39, 174, 96, 0.24)"/>
            <div class="text">Прогресс: {{ course.countDoneLessons }} из {{ course.countLessons }}</div>
          </div>
          <Rating v-if="course.rating" :rating="course.rating"/>
          <div class="course-info duration">{{ course.lessonsCount() }}</div>
        </div>
      </v-img>
    </div>
    <div class="leader">
      <div class="course-avatar" :style="{ backgroundImage: 'url(' + course.account.photoLink + ')' }"></div>
      <span class="desc">{{ course.fullName}}</span>
    </div>
    <div class="course-title">{{ course.name }}</div>
  </div>
</template>

<script lang="ts">
import {Component, Prop, Vue} from 'vue-property-decorator';
import Rating from '@/UI/components/common/Rating.vue';
import {ILeaderCourses} from '@/entity/leaderCourses/leaderCourses.types';
import {AdaptiveStore} from '@/store/modules/Adaptive';
import ProgressCircle from '../progress/ProgressCircle.vue';

@Component({
  components: {
    ProgressCircle,
    Rating,
  },
})
export default class LeaderCourseItem extends Vue {
  @Prop({required: true}) readonly course!: ILeaderCourses;

  get isMobile(): boolean {
    return AdaptiveStore.isMobile;
  }
}
</script>

<style lang="scss">
.course-block {
  .leader {
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-top: 8px;

    .course-avatar {
      border: 1px solid rgba(0, 0, 0, 0.04);
      width: 24px;
      height: 24px;
      margin-right: 8px;
      border-radius: 50%;
      background-size: cover;
    }

    .desc {
      color: #060516;
      opacity: 0.6;
      font-size: 12px;
      line-height: 150%;
    }
  }
}
</style>

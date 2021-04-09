<template>
  <div :class="['course-block', $adaptive.isMobile ? 'course-mobile' : '']">
    <div class="course-video-block" @click="$emit('proceed', course.id)">
      <v-img class="course-image" :src="course.photoLink" max-width="100%" height="100%" :aspect-ratio="16/9">
        <template v-slot:placeholder>
          <CourseSkeleton/>
        </template>
        <div class="course-info-container">
          <div class="course-info progress" v-if="course.progress">
            <ProgressCircle class="mr-2" :progress="course.progress" color="#27AE60" empty-color="rgba(39, 174, 96, 0.24)"/>
            <div class="text">Прогресс: {{ course.countDoneLessons }} из {{ course.countLessons }}</div>
          </div>
          <div class="course-info views"><v-icon color="#ffffff" class="mr-1" x-small>mdi-eye</v-icon>{{course.countViews}}</div>
          <Rating v-if="course.rating" :rating="course.rating"/>
          <div class="course-info duration">{{ course.lessonsCount() }}</div>
        </div>
      </v-img>
    </div>
    <div class="leader">
      <v-avatar size="24" class="course-avatar">
        <v-img :src="course.account.photoLink">
        </v-img>
      </v-avatar>
      <span class="desc">{{ course.fullName}}</span>
    </div>
    <div class="course-title">{{ course.name }}</div>
  </div>
</template>

<script lang="ts">
import {Component, Prop, Vue} from 'vue-property-decorator';
import Rating from '@/UI/components/common/Rating.vue';
import {ILeaderCourses} from '@/entity/leaderCourses/leaderCourses.types';
import ProgressCircle from '../progress/ProgressCircle.vue';
import CourseSkeleton from '../common/skeletons/courseSkeleton/CourseSkeleton.vue';

@Component({
  components: {
    CourseSkeleton,
    ProgressCircle,
    Rating,
  },
})
export default class LeaderCourseItem extends Vue {
  @Prop({required: true}) readonly course!: ILeaderCourses;
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
      margin-right: 8px;
      border-radius: 50%;
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

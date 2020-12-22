<template>
  <div class="course-block" @click="$emit('proceed', course.id)">
    <div class="course-video-block" :style="{backgroundImage: 'url('+course.cover+')'}">
      <Rating :rating="course.rating"/>
      <div class="course-info duration">{{ course.fullDuration() }}</div>
    </div>
    <div class="course-title">{{ course.title }}</div>
  </div>
</template>

<script lang="ts">
import {Component, Prop, Vue} from "vue-property-decorator";
import LeaderCourses from "@/entity/leaderCourses/leaderCourses";
import Rating from "@/UI/components/common/Rating.vue";

@Component({
  components: {
    Rating
  }
})
export default class LeaderCourseItem extends Vue {
  @Prop() readonly leaderFullName!: string;
  @Prop() readonly leaderAvatar!: string;
  @Prop() readonly course!: LeaderCourses;
}
</script>

<style lang="scss">

</style>
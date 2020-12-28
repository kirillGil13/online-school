<template>
  <div class="course-block" @click="$emit('proceed', course.id)">
        <div class="course-video-block" :style="{backgroundImage: 'url('+course.cover+')'}">
            <div class="course-info progress row center">
                <ProgressCircle :progress="course.progress"/>
                <div class="text">Прогресс: {{course.lessonPassed}} из {{course.totalLesson}}</div>
            </div>
            <Rating :rating="course.rating"/>
            <div class="course-info duration">{{course.fullDuration()}}</div>
        </div>
        <div class="course-title">{{course.title}}</div>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import Rating from "../common/Rating.vue";
import ProgressCircle from"../progress/ProgressCircle.vue"
import CoursesListItem from "@/entity/courses/courses"

@Component({
  components: {
    Rating,
    ProgressCircle
  },
})
export default class CourseComponent extends Vue {
  @Prop({default: ''}) readonly course!: CoursesListItem;
}
</script>
<style lang="scss">
</style>
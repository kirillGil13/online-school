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
.course-block {
    width: calc((100% / 3) - 24px);
    margin-right: 24px;
    margin-bottom: 28px;
    cursor: pointer;
    &:nth-child(3n + 3) {
        margin-right: 0;
    }
    .course-video-block {
        font-size: 12px;
        position: relative;
        height: 190px;
        background-size: cover;
        background-repeat: no-repeat;
        border: 1px solid rgba(0, 0, 0, 0.08);
        border-radius: 12px;
        background-blend-mode: multiply;
        background-color: #C4C4C4;
        .course-info {
            position: absolute;
            padding: 0 4px 0 4px;
            background: rgba(6, 5, 22, 0.6);
            backdrop-filter: blur(4px);
            border-radius: 3px;
            color: #ffffff;
            &.progress {
                top: 12px;
                left: 12px;
            }
            &.duration {
                bottom: 8px;
                right: 8px;
            } 
            .text {
                margin-left: 4px;
                text-transform: none;
            }
        }
    }
    .course-title{
        margin-top: 12px;
    }
}
</style>
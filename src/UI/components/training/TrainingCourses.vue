<template>
  <div class="courses">
    <CourseComponent v-for="(course, index) in courses" :key="index" :course="course" v-on="$listeners"/>
  </div>
</template>
<script lang="ts">
import CoursesListItem from '@/entity/courses/courses';
import {Component, Prop, Vue} from 'vue-property-decorator';
import CourseComponent from '../course/CourseComponent.vue';

@Component({
  components: {
    CourseComponent,
  },
})
export default class TrainingCourses extends Vue {
  @Prop() readonly courses!: CoursesListItem[];
}
</script>
<style lang="scss">
.courses {
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
}
</style>

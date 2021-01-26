<template>
  <div class="courses">
    <CourseComponent v-for="(course, index) in courses" :key="index" :course="course" v-on="$listeners"/>
  </div>
</template>
<script lang="ts">
import {Component, Prop, Vue} from 'vue-property-decorator';
import CourseComponent from '../course/CourseComponent.vue';
import {ICoursesListItem} from '@/entity/courses/courses.types';

@Component({
  components: {
    CourseComponent,
  },
})
export default class TrainingCourses extends Vue {
  @Prop() readonly courses!: ICoursesListItem[];
}
</script>
<style lang="scss">
.courses {
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
}
</style>

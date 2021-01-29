<template>
  <v-col>
    <h3>Курсы</h3>
    <div class="companies__courses">
      <CourseComponent
          v-for="(course, index) in courses"
          :key="index"
          :course="course"
      />
    </div>
  </v-col>
</template>
<script lang="ts">
import {Component, Prop, Vue} from 'vue-property-decorator';
import CourseComponent from '@/UI/components/course/CourseComponent.vue';
import CoursesListItem from '@/entity/courses/courses';

@Component({
  components: {
    CourseComponent
  }
})

export default class CompanyComponent extends Vue {
  @Prop() readonly courses!: CoursesListItem[];
}
</script>
<style lang="scss">
.companies {
  &__courses {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 16px;
    margin-top: 8px;

    .course-video-block {
      height: 135px;
    }
  }

  .course-block {
    width: 100%;
    margin-bottom: 0;
  }
}
</style>

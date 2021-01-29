<template>
  <v-col class="org_main">
    <Header class="top_bar_small" title="Топ лидеры компании"><router-link :to="'/'">Показать все</router-link></Header>
    <SliderLeaders :leaders="leaders" />
    <v-col class="box-container box-padding">
      <h2 class="mb-3">Обучение</h2>
      <div class="courses">
        <CourseComponent v-for="(course, index) in courses" :key="index" :course="course" class="course-block-s"/>
      </div>
      <div class="show">
        <Button>Показать все курсы</Button>
      </div>
    </v-col>
  </v-col>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';
import Header from '@/UI/components/common/Header.vue';
import {ILeader, LeaderResponseType} from '@/entity/leader';
import SliderLeaders from '@/UI/components/slider/SliderLeaders.vue';
import CourseComponent from '@/UI/components/course/CourseComponent.vue';
import {CoursesListItemResponseType, ICoursesListItem} from '@/entity/courses/courses.types';
import Button from '@/UI/components/common/Button.vue';
import Leader from '@/entity/leader/leader';
import CoursesListItem from '@/entity/courses/courses';
import {LeaderTestStore} from '@/store/modules/LeadersTest';
import {CoursesTestStore} from '@/store/modules/CoursesTest';
@Component({
  components: {
    Button,
    Header,
    SliderLeaders,
    CourseComponent
  }
})
export default class OrganizationMain extends Vue {
  leaders: ILeader[] = [];
  courses: ICoursesListItem[] = [];
  constructor() {
    super();
    for (let i = 0; i < this.leadersTest.length; i++) {
      this.leaders.push(new Leader(this.leadersTest[i]));
    }
    for (let i = 0; i < this.coursesTest.length; i++) {
      this.courses.push(new CoursesListItem(this.coursesTest[i]));
    }
  }
  get leadersTest(): LeaderResponseType[] {
    return LeaderTestStore.leader;
  }
  get coursesTest(): CoursesListItemResponseType[] {
    return CoursesTestStore.courses;
  }
}
</script>

<style lang="scss">
.org_main {
  h2 {
    font-size: 18px;
  }
  .show {
    display: flex;
    justify-content: center;
    width: 100%;
  }
}
</style>
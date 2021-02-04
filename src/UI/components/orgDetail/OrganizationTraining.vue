<template>
  <v-col class="org_main">
    <Header class="top_bar_small" title="Топ лидеры компании">
      <router-link :to="'/'">Показать все</router-link>
    </Header>
    <SliderLeaders :leaders="leaders"/>
    <v-col class="box-container box-padding">
      <Header class="top_bar_small mb-3" title="Курсы">
        <FilterCourses :isOnRight="true" :filter="filters.courses" :defaultName="filters.defaultCourse"/>
      </Header>
      <div class="courses">
        <LeaderCourseItem v-for="(course, index) in leaderCourses"
                          :key="index"
                          :course="course"
                          :leader-avatar="leaders[index].userInfo.avatar"
                          :leader-full-name="leaders[index].fullName"
                          v-on="$listeners"
                          class="course-block-s"
        />
      </div>
    </v-col>
  </v-col>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';
import Header from '@/UI/components/common/Header.vue';
import SliderLeaders from '@/UI/components/slider/SliderLeaders.vue';
import {ILeaderCourses, LeaderCoursesResponseType} from '@/entity/leaderCourses/leaderCourses.types';
import {ILeader, LeaderResponseType} from '@/entity/leader';
import Filters from '@/entity/filters/filters';
import FilterCourses from '@/UI/components/filter/FilterComponent.vue';
import Leader from '@/entity/leader/leader';
import CoursesListItem from '@/entity/courses/courses';
import {LeaderTestStore} from '@/store/modules/LeadersTest';
import {LeadersCoursesTestStore} from '@/store/modules/LeadersCoursesTest';
import LeaderCourseItem from '@/UI/components/leaderCourse/LeaderCourseItem.vue';

@Component({
  components: {
    LeaderCourseItem,
    Header,
    SliderLeaders,
    FilterCourses
  }
})
export default class OrganizationTraining extends Vue {
  leaderCourses: ILeaderCourses[] = [];
  leaders: ILeader[] = [];
  filters: Filters;

  constructor() {
    super();
    this.filters = new Filters();
    for (let i = 0; i < this.leadersTest.length; i++) {
      this.leaders.push(new Leader(this.leadersTest[i]));
    }
    for (let i = 0; i < this.leadersCoursesTest.length; i++) {
      this.leaderCourses.push(new CoursesListItem(this.leadersCoursesTest[i]));
    }
  }
  get leadersTest(): LeaderResponseType[] {
    return LeaderTestStore.leader;
  }
  get leadersCoursesTest(): LeaderCoursesResponseType[] {
    return LeadersCoursesTestStore.leadersCourses;
  }
}
</script>

<style lang="scss">

</style>
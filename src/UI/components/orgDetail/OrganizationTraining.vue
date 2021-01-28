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
import {Component, Prop, Vue} from 'vue-property-decorator';
import Header from '@/UI/components/common/Header.vue';
import SliderLeaders from '@/UI/components/slider/SliderLeaders.vue';
import LeaderCourseItem from '@/UI/components/leaderCourse/LeaderCourseItem.vue';
import {ILeaderCourses} from '@/entity/leaderCourses/leaderCourses.types';
import {ILeader} from '@/entity/leader';
import Filters from '@/entity/filters/filters';
import FilterCourses from '@/UI/components/filter/FilterCourses.vue';

@Component({
  components: {
    Header,
    SliderLeaders,
    LeaderCourseItem,
    FilterCourses
  }
})
export default class OrganizationTraining extends Vue {
  @Prop() readonly leaderCourses!: ILeaderCourses[];
  @Prop() readonly leaders!: ILeader[];
  @Prop() readonly filters!: Filters;
}
</script>

<style lang="scss">
.top_bar_small {

}
</style>
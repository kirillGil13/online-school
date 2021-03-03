<template>
  <v-col class="org_leaders">
    <Header class="top_bar_small" title="Топ лидеры компании">
      <router-link :to="'/'">Показать все</router-link>
    </Header>
    <SliderLeaders :leaders="leaders"/>
    <Header class="top_bar_small mb-3" title="Все лидеры компании">
    </Header>
    <v-col class="box-container mb-4" v-for="(item, index) in leaders" :key="index">
      <v-col class="pa-0 mb-5">
        <v-row class="ma-0">
          <v-col cols="1" class="pa-0">
            <v-avatar
                color="white"
                size="66"
            ><img :src="item.userInfo.avatar" alt=""></v-avatar>
          </v-col>
          <v-col class="org-info pa-0">
            <h1>{{item.fullName}}</h1>
            <div class="desc">{{item.direction}}</div>
          </v-col>
        </v-row>
      </v-col>
      <div class="courses">
        <LeaderCourseItem v-for="(course, index) in leaderCourses"
                          :key="index"
                          :course="course"
                          :leader-avatar="item.userInfo.avatar"
                          :leader-full-name="item.fullName"
                          v-on="$listeners"
                          class="course-block-s"
        />
      </div>
      <div class="d-flex justify-center">
        <Button>Все курсы лидера</Button>
      </div>
    </v-col>
  </v-col>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';
import {ILeader, LeaderResponseType} from '@/entity/leader';
import Leader from '@/entity/leader/leader';
import {LeaderTestStore} from '../../../store/modules/Leaders';
import {ILeaderCourses, LeaderCoursesResponseType} from '@/entity/leaderCourses/leaderCourses.types';
import CoursesListItem from '@/entity/courses/courses';
import {LeadersCoursesTestStore} from '../../../store/modules/LeadersCourses';
import SliderLeaders from '@/UI/components/slider/SliderLeaders.vue';
import Header from '@/UI/components/common/Header.vue';
import LeaderCourseItem from '@/UI/components/leaderCourse/LeaderCourseItem.vue';
import Button from '@/UI/components/common/Button.vue';
@Component({
  components: {Button, LeaderCourseItem, Header, SliderLeaders}
})
export default class OrganizationLeaders extends Vue {
  leaderCourses: ILeaderCourses[] = [];
  leaders: ILeader[] = [];

  constructor() {
    super();
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
.org_leaders {
  .v-avatar {
    border: 1px solid #F2F2F2 !important;
  }
  .org-info {
    display: flex;
    flex-direction: column;
    justify-content: center;
    h1 {
      font-size: 18px;
      color: #060516;
    }
    .desc {
      font-size: 12px;
      color: #828282;
    }
  }
}
</style>
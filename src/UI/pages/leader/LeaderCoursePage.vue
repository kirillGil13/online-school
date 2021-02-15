<template>
  <v-col>
    <v-row class="leader_page">
      <v-col class="py-0">
        <v-col class="box-container">
          <div class="container">
            <v-col class="pa-0">
              <v-row class="ma-0">
                <v-col :cols="isMobile ? 4 : 2" class="pa-0">
                  <v-avatar
                      color="white"
                      :size="isMobile ? 46 : 66"
                  ><img :src="leader.userInfo.avatar" alt=""></v-avatar>
                </v-col>
                <v-col :class="['leader-info pa-0', isMobile ? 'mobile-info' : '']">
                  <h1>{{leader.fullName}}</h1>
                </v-col>
              </v-row>
            </v-col>
            <v-col class="leader-action pa-0">
              <Button class="py-3">Подписаться</Button>
            </v-col>
          </div>
          <div :class="['leader_page__desc', isMobile ? 'mt-1' : 'mt-3']">{{leader.direction}}</div>
        </v-col>
        <v-col class="box-container mt-6">
          <Header class="top_bar_small" title="Курсы">
            <FilterComponent :isOnRight="true" :filter="filters.filters" :defaultName="filters.default"/>
          </Header>
          <div class="d-flex flex-wrap flex-row mt-6">
            <LeaderCourseItem
                v-for="(course, index) in leaderCourses"
                :key="index"
                :course="course"
                :leader-avatar="leader.userInfo.avatar"
                :leader-full-name="leader.fullName"
                v-on="$listeners"
                class="course-block-s"
            />
          </div>
        </v-col>
      </v-col>
    </v-row>
  </v-col>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';
import Header from '../../components/common/Header.vue';
import SliderLeaders from '../../components/slider/SliderLeaders.vue';
import Search from '../../components/common/Search.vue';
import Leader from '@/entity/leader/leader';
import {ILeader, LeaderResponseType} from '@/entity/leader/leader.types';
import LeaderCourseComponent from '@/UI/components/leaderCourse/LeaderCourseComponent.vue';
import {ILeaderCourses, LeaderCoursesResponseType} from '@/entity/leaderCourses/leaderCourses.types';
import CoursesListItem from '@/entity/courses/courses';
import {LeaderTestStore} from '@/store/modules/LeadersTest';
import {LeadersCoursesTestStore} from '@/store/modules/LeadersCoursesTest';
import Filters from '@/entity/filters/filters';
import FilterComponent from '@/UI/components/filter/FilterComponent.vue';
import LeaderCourseItem from '@/UI/components/leaderCourse/LeaderCourseItem.vue';
import {AdaptiveStore} from '@/store/modules/Adaptive';

@Component({
  components: {
    LeaderCourseItem,
    FilterComponent,
    SliderLeaders,
    Search,
    Header,
    LeaderCourseComponent,
  },
})
export default class LeaderCoursePage extends Vue {
  leaderCourses: ILeaderCourses[] = [];
  leader: ILeader;
  filters: Filters;
  constructor() {
    super();
    this.filters = new Filters();
    this.leader = new Leader(this.leaderTest.filter(item => item.id.toString() === this.$route.params.id)[0]);
    for (let i = 0; i < this.leadersCoursesTest.length; i++) {
      this.leaderCourses.push(new CoursesListItem(this.leadersCoursesTest[i]));
    }
  }
  get leaderTest(): LeaderResponseType[] {
    return LeaderTestStore.leader;
  }
  get leadersCoursesTest(): LeaderCoursesResponseType[] {
    return LeadersCoursesTestStore.leadersCourses;
  }
  get isMobile(): boolean {
    return AdaptiveStore.isMobile;
  }
}
</script>

<style lang="scss">
.leader_page {
  margin-top: -11px !important;
  &__desc {
  font-size: 12px;
  color: #828282;
  }
  .container {
    .v-avatar {
      border: 1px solid #F2F2F2 !important;
    }
    .leader-info {
      display: flex;
      flex-direction: column;
      justify-content: center;
      &.mobile-info {
        h1 {
          font-size: 16px;
        }
      }
      h1 {
        font-size: 24px;
        color: #060516;
      }

    }
    .leader-action {
      display: flex;
      justify-content: flex-end;
      align-items: center;
    }
    button {
      padding-top: 10px;
      padding-bottom: 10px;
      font-size: 12px;
      border-radius: 8px;
      margin-top: 0;
    }
  }
}

</style>

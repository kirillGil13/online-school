<template>
  <v-col>
    <v-row class="leader_page">
      <v-col class="py-0">
        <v-col class="box-container pa-4" v-if="leader">
          <div class="container">
            <v-col class="pa-0">
              <v-row class="ma-0">
                <v-col :cols="$adaptive.isMobile ? 4 : 2" class="pa-0">
                  <v-avatar
                      :color="leader.photoLink ? '#F0F2F6' :randomColor(leader.id % 10)"
                      :size="$adaptive.isMobile ? 46 : 66"
                  >
                    <v-img :src="leader.photoLink" alt=""  v-if="leader.photoLink"/>
                    <span style="color: #fff" class="font-weight-bold" v-else>{{leader.name[0] + leader.lastName[0].toUpperCase()}}</span>
                  </v-avatar>
                </v-col>
                <v-col :class="['leader-info pa-0', $adaptive.isMobile ? 'mobile-info' : '']">
                  <h1>{{ leader.fullName }}</h1>
                </v-col>
              </v-row>
            </v-col>
            <v-col class="leader-action pa-0">
              <!--              <Button class="py-3">Подписаться</Button>-->
            </v-col>
          </div>
          <div :class="['leader_page__desc wrap-text', $adaptive.isMobile ? 'mt-1' : 'mt-3']"
               v-if="leader.description !== null" v-html="leader.description">
          </div>
          <Socials class="px-2 py-1 mt-2" :vk="leader.vkLink" :facebook-link="leader.facebookLink"
                   :instagram-link="leader.instagramLink" :telegram="leader.telegram" :site-link="leader.siteLink"/>
        </v-col>
        <v-col class="box-container mt-6 pa-4">
          <Header class="top_bar_small" title="Курсы" :class="[$adaptive.isMobile && 'flex-column']" action>
            <FilterComponent :search="false" :is-on-right="true" :filters="filters" @filter="onFilter" :count-element="[0,1]"/>
          </Header>
          <div
              :class="['course-list-container course-list-small mt-8 pa-0',$adaptive.isMobile ? 'course-list-mobile' : '']"
              v-if="leadersCourses.length !== 0 || leadersCoursesLoaded">
            <LeaderCourseItem v-for="(course, index) in leadersCourses"
                              :key="index"
                              :course="course"
                              class="course-block-s"
                              @proceed="proceed"
            />
          </div>
          <v-row v-else-if="leadersCourses === []">
            <v-col class="mt-10 d-flex justify-center align-center">
              К сожалению данные не найдены
            </v-col>
          </v-row>
        </v-col>
      </v-col>
    </v-row>
  </v-col>
</template>

<script lang="ts">
import {Component, Vue, Watch} from 'vue-property-decorator';
import Header from '../../components/common/Header.vue';
import SliderLeaders from '../../components/slider/SliderLeaders.vue';
import Search from '../../components/common/Search.vue';
import LeaderCourseComponent from '@/UI/components/leaderCourse/LeaderCourseComponent.vue';
import Filters from '@/entity/filters/filters';
import LeaderCourseItem from '@/UI/components/leaderCourse/LeaderCourseItem.vue';
import {FiltersNameEnum, IFilters} from '../../../entity/filters/filters.types';
import {FiltersStore} from '../../../store/modules/Filters';
import {LeaderItemStore} from '../../../store/modules/LeaderItem';
import {ILeaderItem} from '../../../entity/leaderItem/leaderItem.types';
import FilterComponent from '../../components/filter/FilterComponent.vue';
import {ICourseLevels} from '../../../entity/courseLevels/courseLevels.types';
import {CourseLevelsStore} from '../../../store/modules/CourseLevels';
import {LeadersCoursesStore} from '../../../store/modules/LeadersCourses';
import {ILeaderCourses} from '../../../entity/leaderCourses/leaderCourses.types';
import Socials from '../../components/socials/Socials.vue';

@Component({
  components: {
    Socials,
    FilterComponent,
    LeaderCourseItem,
    SliderLeaders,
    Search,
    Header,
    LeaderCourseComponent,
  },
})
export default class LeaderPage extends Vue {
  filters: Filters;

  constructor() {
    super();
    this.filters = new Filters(this.filtersTraining);
  }

  @Watch('courseLevelsLoaded', {immediate: true})
  onFilterStatusChange(): void {
    for (let i = 0; i < this.courseLevels.length; i++) {
      this.$set(this.filters.filterBody[0].filterValue, i + 1, {
        text: this.courseLevels[i].name,
        value: this.courseLevels[i].id
      });
    }
  }

  get filtersTraining(): IFilters[] {
    return FiltersStore.filters;
  }

  get leader(): ILeaderItem | null {
    return LeaderItemStore.leaderItem;
  }

  get courseLevels(): ICourseLevels[] {
    return CourseLevelsStore.courseLevels;
  }

  get leadersCourses(): ILeaderCourses[] {
    return LeadersCoursesStore.leadersCourses;
  }

  get leadersCoursesLoaded(): boolean {
    return LeadersCoursesStore.leadersCoursesLoaded;
  }

  created(): void {
    this.fetchData();
  }

  proceed(id: number): void {
    this.$router.push({path: `/course/${id}`});
  }

  fetchData(): void {
    LeaderItemStore.fetchData(this.$route.params.id);
    CourseLevelsStore.fetchAll();
    LeadersCoursesStore.fetchAll({
      accountId: parseInt(this.$route.params.id),
    });
  }

  randomColor(i: number): string {
    const COLORS = [
      '#56CCF2',
      '#BB6BD9',
      '#6FCF97',
      '#F2C94C',
      '#967CBA',
      '#FF9960',
      '#566FF2',
      '#FF5733',
      '#FF89C9',
      '#56F2DF',
      '#F38460',
      '#939ED6',
      '#F271A0',
      '#2ABF93',
      '#FF9C9C',
      '#6EC1F0',
      '#3B4244'
    ];
    return COLORS[i || 0];
  }

  beforeDestroy(): void {
    LeadersCoursesStore.clear();
  }

  async onFilter(): Promise<void> {
    await this.filtration();
  }

  async filtration(): Promise<void> {
    await LeadersCoursesStore.fetchAll({
      minCost: this.filters.filterBody.find(item => item.filterType === FiltersNameEnum.Cost)?.filterValue.find(item => item.value === this.filters.default[1])?.minCost,
      maxCost: this.filters.filterBody.find(item => item.filterType === FiltersNameEnum.Cost)?.filterValue.find(item => item.value === this.filters.default[1])?.maxCost,
      courseLevelId: this.filters.default[0],
      accountId: parseInt(this.$route.params.id)
    });
  }
}
</script>

<style lang="scss">
.leader_page {
  margin-top: -11px !important;

  &__desc {
    font-size: 14px;
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

  .tab-controls {
    justify-content: flex-end !important;
  }
}

</style>

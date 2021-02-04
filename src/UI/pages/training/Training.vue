<template>
  <v-col class="training">
    <Header :isBordered="false" title="Обучение" class="top_bar_p_0">
      <div class="d-flex justify-end">
        <Button class="mt-0">Добавить свой курс</Button>
      </div>
    </Header>
    <h5>топ лидеры</h5>
    <SliderLeaders :leaders="leaders"/>
    <v-row>
      <FilterComponent :search="true" :is-on-right="true" :filter="filters.filters" :defaultName="filters.default">
        <template v-slot:search>
          <Search/>
        </template>
      </FilterComponent>
    </v-row>
    <v-row class="mt-10">
      <div class="hash-tag__wrapper mr-3">
        <span class="hash-tag__content">#finiko</span>
      </div>
      <div class="hash-tag__wrapper mr-3">
        <span class="hash-tag__content">#vexel</span>
      </div>
      <div class="hash-tag__wrapper">
        <span class="hash-tag__content">#fnk</span>
      </div>
    </v-row>
    <v-row class="mt-10">
      <div class="d-flex flex-row flex-wrap">
        <LeaderCourseItem v-for="(course, index) in leaderCourses"
                          :key="index"
                          :course="course"
                          :leader-avatar="leaders[index].userInfo.avatar"
                          :leader-full-name="leaders[index].fullName"
                          v-on="$listeners"
                          class="course-block-s"
        />
      </div>
    </v-row>
    <!-- <v-row v-if="$route.params.id === undefined">
        <v-col>
          <Tabs :filters="filters" :tabs="tabs">
              <TabsContent
                v-for="(tab, index) in tabs"
                :key="index"
                :name="tab.title"
                :selected="tab.component === $route.name"
            >
              <keep-alive>
                <router-view :courses="courses" :leaders="leaders" @proceed="proceed"></router-view>
              </keep-alive>
            </TabsContent>
          </Tabs>
        </v-col>
      </v-row>
     -->
  </v-col>
</template>
<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';
import Header from '../../components/common/Header.vue';
import SliderLeaders from '../../components/slider/SliderLeaders.vue';
import Search from '../../components/common/Search.vue';
import Leader from '@/entity/leader/leader';
import {LeaderResponseType} from '@/entity/leader/leader.types';
import Tabs from '../../components/common/tabs/Tabs.vue';
import TabsContent from '../../components/common/tabs/TabsContent.vue';
import {ICoursesListItem} from '@/entity/courses/courses.types';
import {ITabs} from '@/entity/tabs/tabs.types';
import {TabsStore} from '@/store/modules/Tabs';
import {CoursesStore} from '@/store/modules/Courses';
import Filters from '@/entity/filters/filters';
import {LeaderTestStore} from '@/store/modules/LeadersTest';
import Button from '@/UI/components/common/Button.vue';
import {ILeaderCourses, LeaderCoursesResponseType} from '@/entity/leaderCourses/leaderCourses.types';
import {LeadersCoursesTestStore} from '@/store/modules/LeadersCoursesTest';
import CoursesListItem from '@/entity/courses/courses';
import LeaderCourseItem from '@/UI/components/leaderCourse/LeaderCourseItem.vue';
import FilterComponent from '@/UI/components/filter/FilterComponent.vue';

@Component({
  components: {
    FilterComponent,
    LeaderCourseItem,
    Button,
    SliderLeaders,
    Search,
    Header,
    Tabs,
    TabsContent,
  },
})
export default class Training extends Vue {
  leaders: Leader[] = [];
  leaderCourses: ILeaderCourses[] = [];
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

  proceed(id: number): void {
    this.$router.push({path: `/course/${id}`});
  }


  get tabs(): ITabs[] {
    return TabsStore.trainingTabs;
  }

  get courses(): ICoursesListItem[] {
    return CoursesStore.courses;
  }

  async created(): Promise<void> {
    await CoursesStore.fetchAll();
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
.training {
  h5 {
    margin-top: 24px;
  }

  button {
    padding: 10px 16px !important;
    font-size: 12px !important;
  }

  .hash-tag {
    &__wrapper {
      cursor: pointer;
      font-size: 12px;
      line-height: 15px;
      font-family: 'Manrope-Regular';
      font-weight: 600;
      letter-spacing: 1px;
      color: $blue;
      background-color: #e8edfe;
      padding: 7px 12px;
      border-radius: 4px;
    }
  }
  .search {
    margin-left: -12px;
  }
}
</style>

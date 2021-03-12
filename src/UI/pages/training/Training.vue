<template>
  <v-col class="training">
    <Header :isBordered="false" action title="Обучение" class="top_bar_p_0">
      <div class="d-flex justify-end">
        <Button class="mt-0">Добавить свой курс</Button>
      </div>
    </Header>
    <template v-if="leaders.length !== 0 && leadersCoursesLoaded">
      <div class="slider-title d-flex flex-row justify-space-between align-end mb-4">
        <h5>Топ лидеры</h5>
        <router-link :to="''">Показать все</router-link>
      </div>
      <SliderLeaders :leaders="leaders"/>
    </template>
    <v-row>
      <v-col class="py-0">
        <FilterComponent :search="true" :is-on-right="true" :filters="filters" @filter="onFilter">
          <template v-slot:search>
            <Search @search="search"/>
          </template>
        </FilterComponent>
      </v-col>
    </v-row>
    <!--todo-->
    <!--    <v-col>-->
    <!--      <v-row class="mt-10">-->
    <!--        <div class="hash-tag__wrapper mr-3">-->
    <!--          <span class="hash-tag__content">#finiko</span>-->
    <!--        </div>-->
    <!--        <div class="hash-tag__wrapper mr-3">-->
    <!--          <span class="hash-tag__content">#vexel</span>-->
    <!--        </div>-->
    <!--        <div class="hash-tag__wrapper">-->
    <!--          <span class="hash-tag__content">#fnk</span>-->
    <!--        </div>-->
    <!--      </v-row>-->
    <!--    </v-col>-->
    <router-view v-if="leadersCourses.length !== 0 || !leadersCoursesLoaded" :leaderCourses="leadersCourses"/>
    <v-row v-else>
      <v-col class="mt-10 d-flex justify-center align-center">
        К сожалению данные не найдены
      </v-col>
    </v-row>
  </v-col>
</template>
<script lang="ts">
import {Component, Vue, Watch} from 'vue-property-decorator';
import Header from '../../components/common/Header.vue';
import SliderLeaders from '../../components/slider/SliderLeaders.vue';
import Search from '../../components/common/Search.vue';
import Tabs from '../../components/common/tabs/Tabs.vue';
import TabsContent from '../../components/common/tabs/TabsContent.vue';
import Filters from '@/entity/filters/filters';
import Button from '@/UI/components/common/Button.vue';
import LeaderCourseItem from '@/UI/components/leaderCourse/LeaderCourseItem.vue';
import FilterComponent from '@/UI/components/filter/FilterComponent.vue';
import {FiltersNameEnum, IFilters} from '../../../entity/filters/filters.types';
import {FiltersStore} from '../../../store/modules/Filters';
import {LeadersStore} from '../../../store/modules/Leaders';
import {ILeadersListItem} from '../../../entity/leader';
import {LeadersCoursesStore} from '../../../store/modules/LeadersCourses';
import {ILeaderCourses} from '../../../entity/leaderCourses/leaderCourses.types';
import {CourseLevelsStore} from '../../../store/modules/CourseLevels';
import {ICourseLevels} from '../../../entity/courseLevels/courseLevels.types';
import Alert from '../../components/common/Alert.vue';
import {AlertTypeEnum} from '../../../entity/common/alert.types';

@Component({
  components: {
    Alert,
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
  filters: Filters;
  searchBody = '';
  alertType = AlertTypeEnum;

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

  get leaders(): ILeadersListItem[] {
    return LeadersStore.leaders;
  }

  get leadersCourses(): ILeaderCourses[] {
    return LeadersCoursesStore.leadersCourses;
  }

  get leadersCoursesLoaded(): boolean {
    return LeadersCoursesStore.leadersCoursesLoaded;
  }

  get courseLevels(): ICourseLevels[] {
    return CourseLevelsStore.courseLevels;
  }

  get courseLevelsLoaded(): boolean {
    return CourseLevelsStore.courseLevelsLoaded;
  }

  async search(searchBody: string): Promise<void> {
    this.searchBody = searchBody;
    await this.filtration();
  }

  async onFilter(): Promise<void> {
    await this.filtration();
  }

  async filtration(): Promise<void> {
    await LeadersCoursesStore.fetchAll({
      minCost: this.filters.filterBody.find(item => item.filterType === FiltersNameEnum.Cost)?.filterValue.find(item => item.value === this.filters.default[1])?.minCost,
      maxCost: this.filters.filterBody.find(item => item.filterType === FiltersNameEnum.Cost)?.filterValue.find(item => item.value === this.filters.default[1])?.maxCost,
      courseLevelId: this.filters.default[0],
      name: this.searchBody,
    });
  }

  created(): void {
    this.fetchData();
  }

  fetchData(): void {
    LeadersStore.fetchAll();
    CourseLevelsStore.fetchAll();
    LeadersCoursesStore.fetchAll();
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
}
</style>

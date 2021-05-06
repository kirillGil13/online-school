<template>
  <v-col class="training">
    <Header :isBordered="false" action title="Обучение" class="top_bar_p_0">
      <div class="d-flex" :class="[$adaptive.isMobile ? 'justify-start' : 'justify-end']">
        <Button class="mt-0" :full-width="$adaptive.isMobile" @submit="activator = true">Добавить свой курс</Button>
      </div>
    </Header>
    <template v-if="leaders.length !== 0">
      <div class="slider-title d-flex flex-row justify-space-between align-end mb-4">
        <h5>Топ лидеры</h5>
      </div>
      <SliderLeaders :leaders="leaders" id="step-2"/>
    </template>
    <v-row>
      <v-col class="py-0">
        <FilterComponent :search="true" :is-on-right="true" :filters="filters" @filter="onFilter" :count-element="$adaptive.isMobile ? [0,1] : [1]">
          <template v-slot:search>
            <Search @search="search"/>
          </template>
        </FilterComponent>
      </v-col>
    </v-row>
    <router-view v-if="leadersCourses.length !== 0 && leadersCoursesLoaded" :leaderCourses="leadersCourses"/>
    <v-row v-else-if="leadersCourses.length === 0">
      <v-col class="mt-10 d-flex justify-center align-center">
        К сожалению, данные не найдены
      </v-col>
    </v-row>
    <Modal v-if="courseLevelsLoaded" :activator="activator" @activatorChange="activatorChange">
      <template v-slot:content>
        <MailFormComponent :form="mailForm" v-if="destroy" :levels="courseLevels" @close="close" @add="add"/>
      </template>
    </Modal>
    <Alert :show="show" :type="alertType.Success"
           text="Данные успешно отправлены"
           @show="showAlert"/>
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
import Modal from '../../components/common/Modal.vue';
import MailFormComponent from '../../components/forms/mailForm/MailFormComponent.vue';
import {MailForm} from '../../../form/mail/mailForm';
import {MailStore} from '../../../store/modules/Mail';
import { Validate } from '@/plugins/Vuelidate/Decorators';
import { required} from 'vuelidate/lib/validators';

@Component({
  components: {
    MailFormComponent,
    Modal,
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
  mailForm: MailForm;
  destroy = true;
  activator = false;
  show = false;

  constructor() {
    super();
    this.filters = new Filters(this.filtersTraining);
    this.mailForm = new MailForm();
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

  close(): void {
    this.activator = false;
  }

  rerender(): void {
    this.destroy = false;
    this.$nextTick(() => {
      this.destroy = true;
    });
  }

  showAlert(show: boolean): void {
    this.show = show;
  }

  activatorChange(act: boolean): void {
    this.destroy = true;
    this.activator = act;
  }

  created(): void {
    this.fetchData();
  }

  beforeDestroy(): void {
    LeadersCoursesStore.clear();
  }

  fetchData(): void {
    LeadersStore.fetchAll();
    CourseLevelsStore.fetchAll();
    LeadersCoursesStore.fetchAll();
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

  async add(): Promise<void> {
    if (await this.mailForm.submit(MailStore.create)) {
      this.show = true;
    }
    this.mailForm = new MailForm();
    this.rerender();
    this.activator = false;
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

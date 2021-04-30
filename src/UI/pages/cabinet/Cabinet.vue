<template>
  <v-col class="events">
    <Header :isBordered="false" title="Кабинет лидера" action class="top_bar_p_0">
      <div class="d-flex justify-end">
        <Button class="mt-0" small @submit="activator = true">Добавить свой курс</Button>
      </div>
    </Header>
    <v-row class="mb-4">
      <v-col>
        <FilterComponent :search="false" :is-on-right="false" :filters="filters" @filter="onFilter"/>
      </v-col>
    </v-row>
    <v-row class="badges pa-0" v-if="myStatisticLoaded">
      <Badge :profit="myStatistic.purchasesCount.isIncrease">
        <template v-slot:title>Продажи (человек)</template>
        <template v-slot:default>{{myStatistic.purchasesCount.current.toLocaleString()}}</template>
        <template v-slot:stats>{{myStatistic.purchasesCount.change}}</template>
      </Badge>
      <Badge :profit="myStatistic.purchasesIncomeCurrent.isIncrease">
        <template v-slot:title>Заработано</template>
        <template v-slot:default>{{ myStatistic.purchasesIncomeCurrent.current | currency('RUB') }}</template>
        <template v-slot:stats>{{myStatistic.purchasesIncomeCurrent.change}}%</template>
      </Badge>
      <Badge :profit="myStatistic.viewCountCurrent.isIncrease">
        <template v-slot:title>Просмотров</template>
        <template v-slot:default>{{ myStatistic.viewCountCurrent.current.toLocaleString() }}</template>
        <template v-slot:stats>{{ myStatistic.viewCountCurrent.change }}%</template>
      </Badge>
      <Badge :profit="myStatistic.ratingCurrent.isIncrease">
        <template v-slot:title>Средняя оценка</template>
        <template v-slot:default>{{ myStatistic.ratingCurrent.current.toString() }}</template>
        <template v-slot:stats>{{ myStatistic.ratingCurrent.change }}%</template>
      </Badge>
    </v-row>
    <v-col class="events__content">
      <v-row class="events__titles">
        <h3>Мои курсы</h3>
      </v-row>
      <v-row class="events__blocks mt-6" v-if="myCourses.length !== 0">
        <div :class="['course-list-container mt-4 pa-0',$adaptive.isMobile ? 'course-list-mobile' : '']">
          <LeaderCourseItem v-for="(course, index) in myCourses"
                            :key="index"
                            :course="course"
                            @proceed="proceed"
          />
        </div>
      </v-row>
      <v-col v-else class="d-flex mt-10 justify-center align-center">
        К сожалению, Вы еще не добавили ни одного курса
      </v-col>
    </v-col>
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
import {Component, Vue} from 'vue-property-decorator';
import Header from '@/UI/components/common/Header.vue';
import FilterComponent from '@/UI/components/filter/FilterComponent.vue';
import Badge from '@/UI/components/common/Badge.vue';
import LeaderCourseItem from '@/UI/components/leaderCourse/LeaderCourseItem.vue';
import Filters from '@/entity/filters/filters';
import {IFilters} from '../../../entity/filters/filters.types';
import {FiltersStore} from '../../../store/modules/Filters';
import {MyCoursesStore} from '../../../store/modules/MyCourses';
import {ILeaderCourses} from '../../../entity/leaderCourses/leaderCourses.types';
import {MyStatisticStore} from '../../../store/modules/MyStatistic';
import {IMyStatistic} from '../../../entity/myStatistic/myStatistic.types';
import Modal from '../../components/common/Modal.vue';
import {ICourseLevels} from '../../../entity/courseLevels/courseLevels.types';
import {CourseLevelsStore} from '../../../store/modules/CourseLevels';
import {MailStore} from '../../../store/modules/Mail';
import {MailForm} from '../../../form/mail/mailForm';
import Alert from '../../components/common/Alert.vue';
import {AlertTypeEnum} from '../../../entity/common/alert.types';
import Button from '../../components/common/Button.vue';
import MailFormComponent from '../../components/forms/mailForm/MailFormComponent.vue';

@Component({
  components: {
    MailFormComponent,
    Button,
    Alert,
    Modal,
    Header,
    FilterComponent,
    Badge,
    LeaderCourseItem,
  },
})

export default class Cabinet extends Vue {
  filters: Filters;
  activator = false;
  show = false;
  destroy = true;
  mailForm: MailForm;
  alertType = AlertTypeEnum;


  constructor() {
    super();
    this.filters = new Filters(this.filtersPeriods);
    this.mailForm = new MailForm();
  }

  get filtersPeriods(): IFilters[] {
    return FiltersStore.periods;
  }

  get myCourses(): ILeaderCourses[] {
    return MyCoursesStore.myCourses;
  }

  get myStatistic(): IMyStatistic | null {
    return MyStatisticStore.myStatistic;
  }

  get myStatisticLoaded(): boolean {
    return MyStatisticStore.myStatisticLoaded;
  }

  get courseLevels(): ICourseLevels[] {
    return CourseLevelsStore.courseLevels;
  }

  get courseLevelsLoaded(): boolean {
    return CourseLevelsStore.courseLevelsLoaded;
  }

  proceed(id: number): void {
    this.$router.push({path: `/course/${id}`});
  }

  onFilter(): void {
    this.filtration();
  }

  getTime(date?: number): number {
    if (date) {
      return new Date(new Date().setDate(new Date().getDate() - date)).getTime() / 1000 | 0;
    } else return (new Date()).getTime() / 1000 | 0;
  }

  rerender(): void {
    this.destroy = false;
    this.$nextTick(() => {
      this.destroy = true;
    });
  }

  close(): void {
    this.activator = false;
  }

  showAlert(show: boolean): void {
    this.show = show;
  }

  activatorChange(act: boolean): void {
    this.destroy = true;
    this.activator = act;
  }

  async fetchData(): Promise<void> {
    await MyCoursesStore.fetchMyCourses();
    await MyStatisticStore.fetchData({
      timestampStart: this.getTime(this.filters.filterBody[0].filterValue.find(item => item.value === this.filters.default[0])!.value),
      timestampFinish: this.getTime()
    });
    await CourseLevelsStore.fetchAll();
  }

  async created(): Promise<void> {
    await this.fetchData();
  }

  async add(): Promise<void> {
    if (await this.mailForm.submit(MailStore.create)) {
      this.show = true;
    }
    this.mailForm = new MailForm();
    this.rerender();
    this.activator = false;
  }

  async filtration(): Promise<void> {
    await MyStatisticStore.fetchData({
      timestampStart: this.getTime(this.filters.filterBody[0].filterValue.find(item => item.value === this.filters.default[0])!.value),
      timestampFinish: this.getTime()
    })
  }
}
</script>

<style lang="scss">
.events {
  label {
    border: none
  }

  h1 {
    margin-bottom: 5px;
  }

  label {
    margin-left: 0;
    margin-bottom: 10px;
  }

  .badges {
    margin-top: 16px;
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 24px;
    width: 100%;
    overflow-x: scroll;
  }

  .badge {
    margin-bottom: 0 !important;
    padding: 16px 0 8px 24px !important;
    background-color: #ffffff;
    min-width: 230px;
    &__default {
      &:nth-last-child(1) {
        margin-top: 12px;
      }
    }
    &__stats {
      margin-bottom: 5px;
    }
  }

  &__titles {
    display: flex;
    justify-content: space-between;
    align-content: center;

    h3 {
      display: flex;
      align-items: center;
    }
  }

  .course-block {
    width: 100%;
    margin: 0;
  }

  .course-title {
    font-weight: 600;
    margin-top: 4px;
  }

  &__blocks {
    flex-wrap: nowrap;
  }

  &__content {
    margin-top: 39px;
  }

  &__myevents {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 0;
    flex-basis: 37%;
    max-width: 356px;

    button {
      margin-top: 0;
      padding: 10px 16px;
    }
  }

  &__all {
    display: flex;
    flex-direction: column;
    margin-top: 29px;
    gap: 12px;
    padding: 0;
    flex-basis: 36.5%;
  }
}
</style>

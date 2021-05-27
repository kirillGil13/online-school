<template>
  <v-col class="events">
    <Header :isBordered="false" title="Кабинет лидера" action class="top_bar_p_0">
      <div class="d-flex" :class="[$adaptive.isMobile ? 'justify-start' : 'justify-end']">
        <Button class="mt-0" :full-width="$adaptive.isMobile" small @submit="activator = true">Добавить свой курс</Button>
      </div>
    </Header>
    <v-row class="mb-4">
      <v-col>
        <FilterComponent :search="false" :is-on-right="false" :filters="filters" @filter="onFilter" :count-element="[0]"/>
      </v-col>
    </v-row>
    <v-row v-if="myStatisticLoaded">
      <v-col>
        <Badge :profit="myStatistic.purchasesIncomeCurrent.isIncrease" extra-action>
          <template v-slot:title>Баланс</template>
          <template v-slot:default>
            {{ myStatistic.purchasesIncomeCurrent.current | currency('RUB') }}
          </template>
          <template v-slot:stats>{{myStatistic.purchasesIncomeCurrent.change}}%</template>
          <template v-slot:extraAction>
            <div class="d-flex" :class="[$adaptive.isMobile ? 'full-width flex-column' : 'align-center']">
              <div class="link mr-4" :class="[$adaptive.isMobile && 'mb-3']" @click="$router.push({name: $routeRules.CabinetHistory})" style="cursor: pointer">История выводов</div>
              <Button small class="mt-0 px-6" @submit="activatorWithdraw = true">Вывести</Button>
            </div>
          </template>
        </Badge>
      </v-col>
    </v-row>
    <v-row v-if="myStatisticLoaded">
      <v-col class="badges">
        <Badge :profit="myStatistic.purchasesCount.isIncrease">
          <template v-slot:title>Продажи (человек)</template>
          <template v-slot:default>{{myStatistic.purchasesCount.current.toLocaleString()}}</template>
          <template v-slot:stats>{{myStatistic.purchasesCount.change}}</template>
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
      </v-col>
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
    <Modal v-if="courseLevelsLoaded" :full-screen="$adaptive.isMobile" :activator="activator" @activatorChange="activatorChange">
      <template v-slot:content>
        <MailFormComponent :form="mailForm" v-if="activator" :levels="courseLevels" @close="close" @add="add"/>
      </template>
    </Modal>
    <Modal :full-screen="$adaptive.isMobile" :activator="activatorWithdraw" @activatorChange="activatorChangeWithdraw">
      <template v-slot:content>
        <WithDrawFormComponent v-if="activatorWithdraw" :form="withdrawForm" @sendRequest="sendRequest" @close="close"/>
      </template>
    </Modal>
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
import {AlertTypeEnum} from '../../../entity/common/alert.types';
import Button from '../../components/common/Button.vue';
import MailFormComponent from '../../components/forms/mailForm/MailFormComponent.vue';
import {eventBus} from '../../../main';
import WithDrawFormComponent from '../../components/forms/withDrawForm/WithDrawFormComponent.vue';
import {WithDrawForm} from '../../../form/withDraw/withDrawForm';
import {ProfileDocsStore} from '../../../store/modules/ProfileDocs';
import {IProfileDocs} from '../../../entity/profileDocs/profileDocs.types';
import {WithdrawsStore} from '../../../store/modules/Withdraw';

@Component({
  components: {
    WithDrawFormComponent,
    MailFormComponent,
    Button,
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
  activatorWithdraw = false;
  mailForm: MailForm;
  withdrawForm = new WithDrawForm();
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

  get docs(): IProfileDocs | null {
    return ProfileDocsStore.profileDocs;
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

  close(): void {
    this.activator = false;
    this.activatorWithdraw = false;
  }

  activatorChange(act: boolean): void {
    this.activator = act;
  }

  activatorChangeWithdraw(act: boolean): void {
    this.activatorWithdraw = act;
  }

  async fetchData(): Promise<void> {
    await MyCoursesStore.fetchMyCourses();
    await MyStatisticStore.fetchData({
      timestampStart: this.getTime(this.filters.filterBody[0].filterValue.find(item => item.value === this.filters.default[0])!.value),
      timestampFinish: this.getTime()
    });
    await CourseLevelsStore.fetchAll();
    await ProfileDocsStore.fetchData();
    await this.withdrawForm.setFormData(this.docs, this.myStatistic!.purchasesIncomeCurrent.current);
  }

  async created(): Promise<void> {
    await this.fetchData();
  }

  async add(): Promise<void> {
    if (await this.mailForm.submit(MailStore.create)) {
      eventBus.$emit('showAlert', {
        show: true,
        type: this.alertType.Success,
        text: 'Данные успешно отправлены'
      })
    }
    this.mailForm = new MailForm();
    this.activator = false;
  }

  async filtration(): Promise<void> {
    await MyStatisticStore.fetchData({
      timestampStart: this.getTime(this.filters.filterBody[0].filterValue.find(item => item.value === this.filters.default[0])!.value),
      timestampFinish: this.getTime()
    })
  }

  async sendRequest(): Promise<void> {
    if (await this.withdrawForm.submit(WithdrawsStore.withdraw)) {
      this.activatorWithdraw = false;
      eventBus.$emit('showAlert', {
        show: true,
        type: this.alertType.Success,
        text: 'Ваша заявка на вывод успешно отправлена'
      })
    }
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
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 24px;
    width: 100%;
    overflow-x: scroll;
  }

  .badge {
    margin-bottom: 0 !important;
    background-color: #ffffff;
    min-width: 230px;
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

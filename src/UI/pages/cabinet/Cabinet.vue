<template>
  <v-col class="events">
    <Header :isBordered="false" title="Кабинет лидера" class="top_bar_p_0"></Header>
    <v-row class="mb-4">
      <v-col>
        <FilterComponent :search="false" :is-on-right="false" :filters="filters" @filter="onFilter"/>
      </v-col>
    </v-row>
    <v-row class="badges pa-0">
      <Badge :subs="true" :profit="true">
        <template v-slot:title>Продажи (человек)</template>
        <template v-slot:default>26</template>
        <template v-slot:stats>6</template>
      </Badge>
      <Badge :profit="true">
        <template v-slot:title>Заработано</template>
        <template v-slot:default>{{ 637890 | currency('RUB') }}</template>
        <template v-slot:stats>5.3</template>
      </Badge>
      <Badge :profit="true">
        <template v-slot:title>Просмотров</template>
        <template v-slot:default>18771</template>
        <template v-slot:stats>12</template>
      </Badge>
      <Badge :profit="true">
        <template v-slot:title>Средняя оценка</template>
        <template v-slot:default>9.8</template>
        <template v-slot:stats>0.2</template>
      </Badge>
    </v-row>
    <v-col class="events__content">
      <v-row class="events__titles">
        <h3>Мои курсы</h3>
      </v-row>
      <v-row class="events__blocks" v-if="myCourses.length !== 0">
        <div class="events__courses flex-wrap">
          <LeaderCourseItem v-for="(course, index) in myCourses"
                            :key="index"
                            :course="course"
                            @proceed="proceed"
          />
        </div>
      </v-row>
      <v-col v-else class="d-flex mt-10 justify-center align-center">
        К сожалению, вы еще не добавили ни одного курса
      </v-col>
    </v-col>
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


@Component({
  components: {
    Header,
    FilterComponent,
    Badge,
    LeaderCourseItem,
  },
})

export default class Cabinet extends Vue {
  filters: Filters;

  constructor() {
    super();
    this.filters = new Filters(this.filtersPeriods);
  }

  proceed(id: number): void {
    this.$router.push({path: `/training/${id}/0`});
  }

  onFilter(): void {
  }

  get filtersPeriods(): IFilters[] {
    return FiltersStore.periods;
  }

  get myCourses(): ILeaderCourses[] {
    return MyCoursesStore.myCourses;
  }

  async created(): Promise<void> {
    await MyCoursesStore.fetchMyCourses();
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

  &__courses {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 24px;
    margin-top: 29px;
    margin-right: 24px;
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

<template>
  <v-col>
    <Header :isBordered="false" title="Главная" class="top_bar_p_0"></Header>
    <Companies
    :companies="companies"
    :courses="courses"
    @submit="proceed"
    />
  </v-col>
</template>
<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';
import Header from '../../components/common/Header.vue';
import Companies from '@/UI/components/companies/Companies.vue';
import {CompaniesStore} from '@/store/modules/Companies';
import {CompaniesResponseType, ICompaniesListItem} from '@/entity/companies/companies.types';
import {RouterNameEnum} from '@/router/router.types';
import {Company} from '@/entity/companies/companies';
import {CoursesListItemResponseType, ICoursesListItem} from '@/entity/courses/courses.types';
import {CoursesTestStore} from '@/store/modules/CoursesTest';
import CoursesListItem from '@/entity/courses/courses';

@Component({
  components: {
    Header,
    Companies
  }
})

export default class Main extends Vue {
  companies: ICompaniesListItem[] = [];
  courses: ICoursesListItem[] = []

  constructor() {
    super();
    for (let i = 0; i < this.companiesTest.length; i++) {
      this.companies.push(new Company(this.companiesTest[i]));
    }
    for (let i = 0; i < this.coursesTest.length; i++) {
      this.courses.push(new CoursesListItem(this.coursesTest[i]));
    }
  }

  get companiesTest(): CompaniesResponseType[] {
    return CompaniesStore.companies
  }

  get coursesTest(): CoursesListItemResponseType[] {
    return CoursesTestStore.courses;
  }

  proceed(): void {
    this.$router.push({name: RouterNameEnum.OrganizationMain});
  }
}
</script>

<template>
  <div class="companies">
    <CompanyComponent
        v-for="(company, index) in companies"
        :key="index"
        :company="company"
        :courses="courses"
        v-on="$listeners"
    />
  </div>
</template>

<script lang="ts">
import {Vue, Component, Prop} from 'vue-property-decorator';
import CompanyComponent from '@/UI/components/companies/company/CompanyComponent.vue';
import {ICompaniesListItem} from '@/entity/companies/companies.types';
import {ICoursesListItem} from '@/entity/courses/courses.types';

@Component({
  components: {
    CompanyComponent
  }
})

export default class Companies extends Vue {
  @Prop() readonly companies!: ICompaniesListItem[];
  @Prop() readonly courses!: ICoursesListItem[];

}
</script>

<style lang="scss">
.companies {
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-top: 28px;
}
</style>

<template>
  <div class="companies__company">
    <CompanyAvatar
      :avatar="company.avatar"
      :title="company.name"
      :descr="company.description"
    />
    <div class="companies__company-devider"></div>
    <CompanyLeaders :leaders="company.leaders"/>
    <CompanyCourses :courses="company.courses"/>
    <Button class="companies__button" v-on="$listeners">Подробнее</Button>
  </div>
</template>
<script lang="ts">
import {Component, Prop, Vue} from 'vue-property-decorator';
import CompanyAvatar from '@/UI/components/companies/company/Avatar.vue';
import {ICompaniesListItem} from '@/entity/companies/companies.types';
import CompanyLeaders from '@/UI/components/companies/company/Leaders.vue';
import CompanyCourses from '@/UI/components/companies/company/Courses.vue';

@Component({
  components: {
    CompanyAvatar,
    CompanyLeaders,
    CompanyCourses
  }
})

export default class CompanyComponent extends Vue {
  @Prop() readonly company!: ICompaniesListItem;
}
</script>
<style lang="scss">
.companies {
  &__company {
    padding: 16px;
    box-shadow: 0 2px 2px rgba(0, 0, 0, 0.04);
    border-radius: 12px;
    background-color: #fff;
    border: 1px solid #F2F2F2;

    &-devider {
      margin: 16px 0;
      border: 1px solid #F2F2F2;
    }
  }

  &__button {
    padding: 10px 16px;
    display: block;
    margin-top: 16px;
    margin-left: auto;
    margin-right: auto;
  }
}
</style>

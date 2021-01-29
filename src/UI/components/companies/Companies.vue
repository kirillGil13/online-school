<template>
  <div class="companies">
    <CompanyComponent
        v-for="(company, index) in companies"
        :key="index"
        :company="company"
    />
  </div>
</template>

<script lang="ts">
import {Vue, Component, Prop} from 'vue-property-decorator';
import CompanyComponent from '@/UI/components/companies/company/CompanyComponent.vue';
import {ICompaniesListItem} from '@/entity/companies/companies.types';

@Component({
  components: {
    CompanyComponent
  }
})

export default class Companies extends Vue {
  @Prop() readonly companies!: ICompaniesListItem[];

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

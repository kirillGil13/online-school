<template>
  <v-col>
    <Header :isBordered="false" title="Главная" class="top_bar_p_0"></Header>
    <Companies
    :companies="Companies"
    />
  </v-col>
</template>
<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';
import Header from '../../components/common/Header.vue';
import Companies from '@/UI/components/companies/Companies.vue';
import {CompaniesStore} from '@/store/modules/Companies';
import {ICompaniesListItem} from '@/entity/companies/companies.types';

@Component({
  components: {
    Header,
    Companies
  }
})

export default class Main extends Vue {
  get Companies(): ICompaniesListItem[] | null {
    return CompaniesStore.companies
  }

  mounted(): void {
    CompaniesStore.fetchCompanies();
  }
}
</script>

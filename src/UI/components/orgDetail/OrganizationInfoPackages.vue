<template>
  <div>
    <v-col class="package box-container">
      <Header title="Инфопакеты"
              class="top_bar_small mb-6"
              description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nisl scelerisque pretium aliquet molestie viverra dolor cursus. Nulla fusce dictum neque volutpat sollicitudin ante. Sed euismod turpis nulla massa neque vitae mattis. Ligula ullamcorper in rutrum at."></Header>
      <div class="d-flex flex-row flex-wrap">
        <InfoPackageComponent v-for="(item, index) in infoPackages" :key="index" :info-package="item"/>
      </div>
    </v-col>
  </div>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';
import {IInfoPackage, InfoPackageResponseType} from '@/entity/infoPackages/infoPackage.types';
import {InfoPackagesStore} from '@/store/modules/InfoPackages';
import InfoPackageComponent from '@/UI/components/infoPackage/InfoPackageComponent.vue';
import InfoPackage from '@/entity/infoPackages/infoPackage';
import Header from '@/UI/components/common/Header.vue';
@Component({
  components: {Header, InfoPackageComponent}
})
export default class OrganizationInfoPackages extends Vue {
  infoPackages: IInfoPackage[] = []

  constructor() {
    super();
    for (let i = 0; i < this.infoPackagesTest.length; i++) {
      this.infoPackages.push(new InfoPackage(this.infoPackagesTest[i]));
    }
  }

  get infoPackagesTest(): InfoPackageResponseType[] {
    return InfoPackagesStore.infoPackages;
  }
}
</script>

<style lang="scss">
.package {
  h1 {
    margin: 0 !important;
  }
  padding: 16px !important;
}
</style>
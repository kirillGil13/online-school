<template>
  <v-col class="info_packages">
    <Header
        :isBordered="false"
        title="Инфопакеты"
        class="top_bar_p_0"
        description="Здесь отображаются все инфопакеты компании"
    >
    </Header>
    <div class="d-flex flex-row flex-wrap mt-6">
      <InfoPackageComponent v-for="(item, index) in infoPackages" :key="index" :info-package="item" @proceed="proceed"/>
    </div>
  </v-col>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';
import InfoPackageComponent from '../../components/infoPackage/InfoPackageComponent.vue';
import Header from '../../components/common/Header.vue';
import {InfoPackagesStore} from '../../../store/modules/InfoPackages';
import {IInfoPackage} from '../../../entity/infoPackages/infoPackage.types';
import {IUser} from '../../../entity/user';
import {AuthStore} from '../../../store/modules/Auth';
import {RouterNameEnum} from '../../../router/router.types';

@Component({
  components: {Header, InfoPackageComponent}
})
export default class InfoPackages extends Vue {
  async created(): Promise<void> {
    await InfoPackagesStore.fetchAll();
  }

  get infoPackages(): IInfoPackage[] {
    return InfoPackagesStore.infoPackages;
  }

  get user(): IUser {
    return AuthStore.user;
  }

  proceed(id: number): void {
    const routeData = this.$router.resolve({
      name: RouterNameEnum.Landing,
      params: {id: id.toString()},
      query: {account_id: this.user.id.toString()}//eslint-disable-line
    });
    window.open(routeData.href, '_blank');
  }
}
</script>

<style lang="scss">

</style>
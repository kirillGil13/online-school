<template>
  <v-col class="info_packages">
    <Header
        :isBordered="false"
        title="Инфопакеты"
        class="top_bar_p_0"
        description="Здесь отображаются все инфопакеты компании"
    >
    </Header>
    <v-col class="d-flex flex-row flex-wrap mt-6 pa-0">
      <InfoPackageComponent v-for="(item, index) in infoPackages" :key="index" :info-package="item" @proceed="proceed"/>
    </v-col>
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
import Api from '../../../repository/api';

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

  async addLessons(): Promise<void> {
    const response = await Api.post('/lessons', {
      name: 'Вступительный урок',
      description: 'У каждого из нас найдутся дела, которые требуют периодических финансовых вложений: ЖКХ, детский сад, ремонт, хобби и т.д.',
      shortPhotoLink: '',
      m3u8FileLink: '',
      files: [],
      courseId: 3
    });
    if (response) {
      console.log(response);
    }
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
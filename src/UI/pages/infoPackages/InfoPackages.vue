<template>
  <v-col class="info_packages">
    <Header
        :isBordered="false"
        title="Инфопакеты"
        class="top_bar_p_0"
        description="Здесь отображаются все инфопакеты компании"
    >
    </Header>
    <v-col :class="['course-list-container mt-6 pa-0',$adaptive.isMobile ? 'course-list-mobile' : '']">
      <InfoPackageComponent v-for="(item, index) in infoPackages" :key="index" :info-package="item" @proceed="proceed" @copied="copied"/>
    </v-col>
    <Alert :show="show" :type="alertType.Success" text="Скопировано в буфер обмена" @show="showAlert"/>
    <Modal :activator="activatorSub" :max-width="1000" @activatorChange="activatorSubChange" color="#F2F2F2">
      <template v-slot:content>
        <SubscribeFormalization/>
      </template>
    </Modal>
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
import Alert from '../../components/common/Alert.vue';
import {AlertTypeEnum} from '../../../entity/common/alert.types';
import SubscribeFormalization from '../../components/subscribeFormalization/SubscribeFormalization.vue';
import Modal from '../../components/common/Modal.vue';

@Component({
  components: {Modal, SubscribeFormalization, Alert, Header, InfoPackageComponent}
})
export default class InfoPackages extends Vue {
  show = false;
  alertType = AlertTypeEnum;
  activatorSub = false;

  proceed(id: number): void {
    if (this.user!.isSubscriptionActual) {
      const routeData = this.$router.resolve({
        name: this.$routeRules.Landing,
        params: {id: id.toString()},
        query: {account_id: this.user!.id.toString()}//eslint-disable-line
      });
      window.open(routeData.href, '_blank');
    } else {
      this.activatorSub = true;
    }
  }

  activatorSubChange(act: boolean): void {
    this.activatorSub = act;
  }

  showAlert(show: boolean): void {
    this.show = show;
  }

  copied(): void {
    if (this.user!.isSubscriptionActual) {
      this.show = true;
    }
  }

  get infoPackages(): IInfoPackage[] {
    return InfoPackagesStore.infoPackages;
  }

  get user(): IUser | null {
    return AuthStore.user;
  }

  async created(): Promise<void> {
    await InfoPackagesStore.fetchAll();
  }
}
</script>

<style lang="scss">
</style>

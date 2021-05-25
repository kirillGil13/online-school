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
import {AlertTypeEnum} from '../../../entity/common/alert.types';
import SubscribeFormalization from '../../components/subscribeFormalization/SubscribeFormalization.vue';
import Modal from '../../components/common/Modal.vue';
import {eventBus} from '../../../main';

@Component({
  components: {Modal, SubscribeFormalization, Header, InfoPackageComponent}
})
export default class InfoPackages extends Vue {
  alertType = AlertTypeEnum;
  activatorSub = false;

  proceed(id: number): void {
    if (this.user!.subscription.isActual) {
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

  copied(): void {
    if (this.user!.subscription.isActual) {
      eventBus.$emit('showAlert', {
        show: true,
        type: this.alertType.Success,
        text: 'Скопировано в буфер обмена'
      })
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

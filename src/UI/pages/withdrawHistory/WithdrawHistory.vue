<template>
  <v-col class="events">
    <v-col class="pt-0">
      <Header :isBordered="true" :route="{name: $routeRules.Cabinet, label: 'Вернуться в кабинет'}" title="История выводов" class="top_bar_p_0"></Header>
    </v-col>
    <v-row v-if="myStatisticLoaded" class="mt-8">
      <v-col>
        <Badge :profit="null" extra-action>
          <template v-slot:title>Баланс</template>
          <template v-slot:default>
            {{ balance | currency('RUB') }}
          </template>
          <template v-slot:extraAction>
            <div class="d-flex align-center" :class="[$adaptive.isMobile && 'full-width']">
              <Button small :full-width="$adaptive.isMobile" class="mt-0 px-6" @submit="activatorWithdraw = true">Вывести</Button>
            </div>
          </template>
        </Badge>
      </v-col>
    </v-row>
    <v-row v-if="withdrawsLoaded">
      <v-col v-if="withdraws !== []">
        <WithdrawsHistoryTable :withdraws="withdraws"/>
      </v-col>
      <v-col v-else class="d-flex align-center justify-center">
        Данные не найдены...
      </v-col>
    </v-row>
    <Modal :full-screen="$adaptive.isMobile" :activator="activatorWithdraw" @activatorChange="activatorChangeWithdraw">
      <template v-slot:content>
        <WithDrawFormComponent v-if="activatorWithdraw" :form="withdrawForm" @sendRequest="sendRequest" @close="close"/>
      </template>
    </Modal>
  </v-col>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';
import Header from '../../components/common/Header.vue';
import Modal from '../../components/common/Modal.vue';
import WithDrawFormComponent from '../../components/forms/withDrawForm/WithDrawFormComponent.vue';
import {MyStatisticStore} from '../../../store/modules/MyStatistic';
import {ProfileDocsStore} from '../../../store/modules/ProfileDocs';
import {IMyStatistic} from '../../../entity/myStatistic/myStatistic.types';
import {IProfileDocs} from '../../../entity/profileDocs/profileDocs.types';
import {WithDrawForm} from '../../../form/withDraw/withDrawForm';
import {WithdrawsStore} from '../../../store/modules/Withdraw';
import {eventBus} from '../../../main';
import {AlertTypeEnum} from '../../../entity/common/alert.types';
import Badge from '../../components/common/Badge.vue';
import Button from '../../components/common/Button.vue';
import {IWithdraw} from '../../../entity/withdraw/withdraw.types';
import WithdrawsHistoryTable from '../../components/withdrawsHistoryTable/WithdrawsHistoryTable.vue';
import {BalanceStore} from '../../../store/modules/Balance';
@Component({
  components: {WithdrawsHistoryTable, Button, Badge, WithDrawFormComponent, Modal, Header}
})
export default class WithdrawHistory extends Vue {

  activatorWithdraw = false;
  withdrawForm = new WithDrawForm();
  alertType = AlertTypeEnum;

  get myStatisticLoaded(): boolean {
    return MyStatisticStore.myStatisticLoaded;
  }

  get myStatistic(): IMyStatistic | null {
    return MyStatisticStore.myStatistic;
  }

  get docs(): IProfileDocs | null {
    return ProfileDocsStore.profileDocs;
  }

  get withdraws(): IWithdraw[] {
    return WithdrawsStore.withdraws;
  }

  get withdrawsLoaded(): boolean {
    return WithdrawsStore.withdrawsLoaded;
  }

  get balance(): number | null {
    return BalanceStore.balance;
  }

  activatorChangeWithdraw(act: boolean): void {
    this.activatorWithdraw = act;
  }

  close(): void {
    this.activatorWithdraw = false;
  }

  fetchWithdraws = (): void => {
    const bottomOfWindow =
        document.documentElement.scrollTop + window.innerHeight === document.documentElement.offsetHeight;
    if (bottomOfWindow && this.withdraws.length % 100 === 0) {
      const skip = this.withdraws.length;
      setTimeout(e => {
        WithdrawsStore.fetchAll({
          pagination: {skip: skip, limit: 100},
          scroll: true
        });
      }, 300);
    }
  };

  mounted(): void {
    window.addEventListener('scroll', this.fetchWithdraws);
  }

  beforeDestroy(): void {
    window.removeEventListener('scroll', this.fetchWithdraws);
  }

  async fetchData(): Promise<void> {
    await MyStatisticStore.fetchData();
    await ProfileDocsStore.fetchData();
    await WithdrawsStore.fetchAll({pagination: {limit: 100}})
    await BalanceStore.fetchData();
    await this.withdrawForm.setFormData(this.docs, this.balance!.toString());
  }

  async created(): Promise<void> {
    await this.fetchData();
  }

  async sendRequest(): Promise<void> {
    if (await this.withdrawForm.submit(WithdrawsStore.withdraw)) {
      this.activatorWithdraw = false;
      await this.withdrawForm.clearData();
      eventBus.$emit('showAlert', {
        show: true,
        type: this.alertType.Success,
        text: 'Ваша заявка на вывод успешно отправлена'
      })
      await BalanceStore.fetchData();
      this.withdrawForm.setFormData(this.docs, this.balance!.toString());
    }
  }
}
</script>

<style lang="scss">

</style>

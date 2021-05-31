<template>
  <div>
    <div class="history-table" v-if="!$adaptive.isMobile">
      <v-row no-gutters>
        <v-col class="table-col-title" v-for="(item, index) in header" :key="index">{{ item }}</v-col>
      </v-row>
      <v-row no-gutters v-for="(item, index) in withdraws" :key="index">
        <v-col class="table-col">{{ item.amount | currency('RUB') }}</v-col>
        <v-col class="table-col">{{ item.commission + '%' }}</v-col>
        <v-col class="table-col">{{ item.adjustedAmount | currency('RUB') }}</v-col>
        <v-col class="table-col">{{ item.createdAt }}</v-col>
        <v-col class="table-col" :style="{color: item.status === statusName.ACCEPTED ? '#27AE60' : '#F2994A'}">
          {{ item.status === statusName.ACCEPTED ? 'Исполнено' : 'В процессе' }}
        </v-col>
      </v-row>
    </div>
    <div class="history-table" v-else>
      <v-col class="pt-5 pb-0 py-0" v-for="(item, index) in withdraws" :style="{borderBottom: index === withdraws.length - 1 ? 'none' : '1px solid #f2f2f2'}" :key="index">
        <v-col class="table-col mobile pt-0 pb-5">
          <div class="table-col-title pa-0 mb-1">{{header[0]}}</div>
          {{ item.amount | currency('RUB') }}
        </v-col>
        <v-col class="table-col mobile pt-0 pb-5">
          <div class="table-col-title pa-0 mb-1">{{header[1]}}</div>
          {{ item.commission + '%'}}
        </v-col>
        <v-col class="table-col mobile pt-0 pb-5">
          <div class="table-col-title pa-0 mb-1">{{header[2]}}</div>
          {{ item.adjustedAmount | currency('RUB') }}
        </v-col>
        <v-col class="table-col mobile pt-0 pb-5">
          <div class="table-col-title pa-0 mb-1">{{header[3]}}</div>
          {{ item.createdAt }}
        </v-col>
        <v-col class="table-col mobile pt-0 pb-5" :style="{color: item.status === statusName.ACCEPTED ? '#27AE60' : '#F2994A'}">
          <div class="table-col-title pa-0 mb-1">{{header[4]}}</div>
          {{ item.status === statusName.ACCEPTED ? 'Исполнено' : 'В процессе' }}
        </v-col>
      </v-col>
    </div>
  </div>
</template>

<script lang="ts">
import {Component, Prop, Vue} from 'vue-property-decorator';
import {IWithdraw, WithdrawStatusEnum} from '../../../entity/withdraw/withdraw.types';

@Component
export default class WithdrawsHistoryTable extends Vue {
  @Prop({required: true}) readonly withdraws!: IWithdraw[];
  statusName = WithdrawStatusEnum;

  header: string[] = ['Сумма', 'Комиссия платформы', 'Итого на вывод', 'Дата вывода', 'Статус']
}
</script>

<style lang="scss">

</style>

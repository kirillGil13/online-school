<template>
  <div>
    <v-row class="mt-3 pr-1" no-gutters>
      <v-col class="sub-container pa-4 mr-3 d-flex flex-column justify-space-between" :style="{borderColor: (user.subExist(subType.month)) && '#426DF6'}">
        <div>
          <div class="font-weight-bold text-center" :style="{color: '#426df6'}">
            <span class="font-18">1 месяц</span>
          </div>
          <template v-if="user.subExist(subType.month) !== null && user.subExist(subType.month) === true">
            <div class="price font-weight-bold pa-4 mt-2">
              <span class="font-16">399 ₽</span> за 1 месяц
            </div>
            <div class="mt-2">
              {{user.subExist(subType.month) && user.subscription.isActual === true ? 'Возобновление: ' : 'Дата окончания: '}}{{user.subscription.expiresAt}}
            </div>
          </template>
          <div v-else-if="user.subscription.isTestPeriodAvailable" class="text-center mt-4">
            7 дней бесплатно,<br>
            затем месяц за <strong>399 ₽</strong>
          </div>
          <div v-else class="text-center mt-4">
            Подписка на месяц за <strong>399 ₽</strong>
          </div>
        </div>
        <div>
          <Button class="mt-4" @submit="unSub" v-if="user.subscription.isActual !== null && user.subscription.subType === subType.month" :disabled="user.subscription.isActual === false" small full-width>Отменить подписку</Button>
          <Button class="mt-4" v-else @submit="subscribe(subType.year)" :disabled="!checkSub1" small full-width>Оформить за 399 ₽</Button>
          <template v-if="user.subscription.isTestPeriod !== null && user.subExist(subType.month) !== null && user.subExist(subType.month) === true">
            <div class="sub-desc mt-2" v-if="user.subscription.isTestPeriod">
              Отменяя подписку сейчас, Вы прекращаете ее действие. Также, повторный тестовый период будет не доступен.
            </div>
            <div class="sub-desc mt-2" v-else-if="user.subscription.isActual === true">
              Вы можете отменить подписку сейчас и продолжить ее использование до <strong>{{user.subscription.expiresAt}}</strong>
            </div>
            <div class="sub-desc mt-2" v-else>
              Ваша подписка отменена. Ее действие продолжится до <strong>{{user.subscription.expiresAt}}</strong>.
            </div>
          </template>
          <div class="d-flex align-start flex-row mt-2" v-else>
            <v-checkbox
                dense
                hide-details
                v-model="checkSub1"
                class="check"
            >
            </v-checkbox>
            <div>
              <div :style="{lineHeight: '125%'}">
                <router-link target="_blank" :to="{name: $routeRules.TermsOfSubscription}">Согласен с условиями оферты рекуррентных платежей</router-link> и
                <router-link target="_blank" :to="{name: $routeRules.PersonalData}">политикой обработки персональных данных</router-link>
              </div>
            </div>
          </div>
        </div>
      </v-col>
      <v-col class="sub-container pa-4 d-flex flex-column justify-space-between" :style="{borderColor: (user.subExist(subType.year)) && '#426DF6'}">
        <div>
          <div class="font-weight-bold text-center" :style="{color: '#426df6'}">
            <span class="font-18">12 месяцев</span>
          </div>
          <template v-if="user.subExist(subType.year) !== null && user.subscription.subType === subType.year">
            <div class="price font-weight-bold pa-4 mt-2">
              <span class="font-16">3990 ₽</span> за 12 месяцев
            </div>
            <div class="text-left mt-2">
              {{user.subExist(subType.year) && user.subscription.isActual === true ? 'Возобновление: ' : 'Дата окончания: '}}{{user.subscription.expiresAt}}
            </div>
          </template>
          <div v-else-if="user.subscription.isTestPeriodAvailable" class="text-center mt-4">
            7 дней бесплатно,<br>
            затем месяц за <strong>3 990 ₽</strong> вместо <strike>4 799 ₽</strike>
          </div>
          <div v-else class="text-center mt-4">
            Подписка на 12 месяцев за <strong>3990 ₽</strong>
          </div>
        </div>
        <div>
          <Button class="mt-4" @submit="unSub" v-if="user.subscription.isActual !== null && user.subscription.subType === subType.year" :disabled="user.subscription.isActual === false" small full-width>Отменить подписку</Button>
          <Button class="mt-4" @submit="subscribe(subType.year)" v-else :disabled="!checkSub2" small full-width>Оформить за 3990 ₽</Button>
          <template v-if="user.subscription.isTestPeriod !== null && user.subExist(subType.year) !== null && user.subExist(subType.year) === true">
            <div class="sub-desc mt-2" v-if="user.subscription.isTestPeriod">
              Отменяя подписку сейчас, Вы прекращаете ее действие. Также, повторный тестовый период будет не доступен.
            </div>
            <div class="sub-desc mt-2" v-else-if="user.subscription.isActual === true">
              Вы можете отменить подписку сейчас и продолжить ее использование до <strong>{{user.subscription.expiresAt}}</strong>
            </div>
            <div class="sub-desc mt-2" v-else>
              Ваша подписка отменена. Ее действие продолжится до <strong>{{user.subscription.expiresAt}}</strong>.
            </div>
          </template>
          <div class="d-flex align-start flex-row mt-2" v-else>
            <v-checkbox
                dense
                hide-details
                v-model="checkSub2"
                class="check"
            >
            </v-checkbox>
            <div>
              <div :style="{lineHeight: '125%'}">
                <router-link target="_blank" :to="{name: $routeRules.TermsOfSubscription}">Согласен с условиями оферты рекуррентных платежей</router-link> и
                <router-link target="_blank" :to="{name: $routeRules.PersonalData}">политикой обработки персональных данных</router-link>
              </div>
            </div>
          </div>
        </div>
      </v-col>
    </v-row>
    <div class="sub-desc mt-2" v-if="user.subscription.isTestPeriod">
      В течении срока действия бесплатного периода с Вас не будет взиматься плата. Подписка будет возобновляться автоматически
      <br> по цене <strong>{{user.subscription.subType === subType.month ? '399 ₽ в мес.' : '3990 ₽ в год'}}</strong> начиная с <strong>{{user.subscription.expiresAt}}</strong>
      пока Вы не отмените ее по меньшей мере за день до этой даты.
    </div>
  </div>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';
import {IUser} from '../../../../entity/user';
import {AuthStore} from '../../../../store/modules/Auth';
import Button from '../../common/Button.vue';
import {SubTypeName} from '../../../../entity/common/sub.types';
import {SubscriptionStore} from '../../../../store/modules/Subscription';
@Component({
  components: {Button}
})
export default class ProfileSubs extends Vue {

  subType = SubTypeName;
  checkSub1 = false;
  checkSub2 = false;

  async subscribe(subType: string): Promise<void> {
    // eslint-disable-next-line @typescript-eslint/camelcase
    // window.location.href = await SubscriptionStore.subscribe({subscription_type: subType});
  }

  async unSub(): Promise<void> {
    if (await SubscriptionStore.delete()) {
      window.location.reload();
    }
  }

  get user(): IUser | null {
    return AuthStore.user;
  }
}
</script>

<style lang="scss">
.sub-container {
  border-radius: 12px;
  border: 1px solid #f2f2f2;
  .price {
    background: rgba(66, 109, 246, 0.12);
    border-radius: 12px;
    color: #426df6;
  }
}
.check {
  .v-input__slot {
    align-items: unset !important;
  }
  .v-label {
    font-size: 12px !important;
    margin-left: 4px !important;
  }
}
.sub-desc {
  font-size: 12px;
  color: #5A606F;
}
</style>

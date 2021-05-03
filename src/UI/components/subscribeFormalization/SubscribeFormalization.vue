<template>
  <v-col :class="[$adaptive.isMobile ? 'pa-4' : 'pa-9']">
    <v-col class="box-container py-6 px-4 d-flex flex-column justify-center align-center">
      <Subscription/>
    </v-col>
    <div class="text-center font-18 font-weight-bold mt-9">Выберите период подписки</div>
    <v-row class="mt-7" no-gutters>
      <v-col :class="['d-flex flex-column box-container justify-center align-center pa-4', $adaptive.isMobile ? '' : 'mr-4']">
        <div class="subs-title">1 месяц</div>
        <div class="text-center mt-4">7 дней бесплатно,<br>
          затем месяц за <strong>399 ₽</strong></div>
        <div class="d-flex align-start flex-row mt-4">
          <v-checkbox
              dense
              v-model="checkSub1"
              class="check"
          >
          </v-checkbox>
          <div>
            <div>
              <router-link target="_blank" :to="{name: $routeRules.TermsOfSubscription}">Согласен с условиями оферты рекуррентных платежей</router-link> и
              <router-link target="_blank" :to="{name: $routeRules.PersonalData}">политикой обработки персональных данных</router-link>
            </div>
          </div>
        </div>
        <Button :disabled="!checkSub1" small full-width @submit="subscribe">Оформить за 399 ₽</Button>
      </v-col>
      <v-col :class="['d-flex flex-column box-container justify-center align-center pa-4', $adaptive.isMobile ? 'mt-4' : '']">
        <div class="subs-title">12 месяцев</div>
        <div class="text-center mt-4">7 дней бесплатно,<br>
          затем месяц за <strong>3 990 ₽</strong> вместо <strike>4 799 ₽</strike></div>
        <div class="d-flex align-start flex-row mt-4">
          <v-checkbox
              dense
              v-model="checkSub2"
              class="check"
          >
          </v-checkbox>
          <div>
            <div>
              <router-link target="_blank" :to="{name: $routeRules.TermsOfSubscription}">Согласен с условиями оферты рекуррентных платежей</router-link> и
              <router-link target="_blank" :to="{name: $routeRules.PersonalData}">политикой обработки персональных данных</router-link>
            </div>
          </div>
        </div>
        <Button :disabled="!checkSub2" small full-width @submit="subscribe">Оформить за 3 990 ₽</Button>
      </v-col>
    </v-row>
    <div class="info-desc text-center mt-8">Отменить подписку можно в любой момент</div>
  </v-col>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';
import Subscription from '../subscription/Subscription.vue';
import Button from '../common/Button.vue';
import {SubscriptionStore} from '../../../store/modules/Subscription';
@Component({
  components: {Button, Subscription}
})
export default class SubscribeFormalization extends Vue {
  checkSub1 = false;
  checkSub2 = false;
  async subscribe(): Promise<void> {
    if (await SubscriptionStore.subscribe()) {
      window.location.reload();
    }
  }
}
</script>

<style lang="scss">
.subs-title {
  color: #426DF6;
}
.check {
  margin-top: -2px !important;
  .v-input__slot {
    align-items: unset !important;
  }
  .v-label {
    font-size: 12px !important;
    margin-left: 4px !important;
  }
}
</style>

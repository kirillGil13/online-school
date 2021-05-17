<template>
  <div>
    <v-row class="mt-3 pr-1" no-gutters>
      <v-col class="sub-container pa-4 mr-3 d-flex flex-column justify-space-between" :style="{borderColor: (user.subscription.isActual && user.subscription.sum === 390) && '#426DF6'}">
        <div>
          <div class="price font-weight-bold text-center">
            <span class="font-18">1 месяц</span>
          </div>
          <div class="price font-weight-bold">
            <span class="font-16">390 ₽</span> за 1 месяц
          </div>
          <div>
            Возобновление: {{user.subscription.freePeriodExpire}}
          </div>
        </div>
        <div>
          <div class="sub-desc mt-2" v-if="user.subscription.isActual">
            Вы можете отменить подписку сейчас и продолжить ее использование до <strong>{{user.subscription.expiresAt}}</strong>
          </div>
          <Button class="mt-2" small full-width>{{user.subscription.isActual && user.subscription.sum === 390 ? 'Отменить подписку' : `Оформить за 390 ₽`}}</Button>
        </div>
      </v-col>
      <v-col class="sub-container pa-4" :style="{borderColor: (user.subscription.isActual && user.subscription.sum === 3990) && '#426DF6'}">
        <div class="price font-weight-bold text-center">
          <span class="font-18">12 месяцев</span>
        </div>
        <div class="price font-weight-bold" v-if="user.subscription.isActual && user.subscription.sum === 3990">
          <span class="font-16">3990 ₽</span> за 12 месяцев
        </div>
        <div v-else class="text-left mt-4">7 дней бесплатно,<br>
          затем месяц за <strong>3 990 ₽</strong> вместо <strike>4 799 ₽</strike></div>
        <div v-if="user.subscription.isActual && user.subscription.sum === 3990">
          Возобновление: {{user.subscription.freePeriodExpire}}
        </div>
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
        <Button small full-width>{{user.subscription.isActual && user.subscription.sum === 3990 ? 'Отменить подписку' : `Оформить за 3990 ₽`}}</Button>
        <div class="sub-desc mt-2" v-if="user.subscription.isActual && user.subscription.sum === 3990">
          Вы можете отменить подписку сейчас и продолжить ее использование до <strong>{{user.subscription.expiresAt}}</strong>
        </div>
      </v-col>
    </v-row>
    <div class="sub-desc mt-2" v-if="user.subscription.isActual">
      В течении срока действия бесплатного периода с Вас не будет взиматься плата. Подписка будет возобновляться автоматически
      <br> по цене <strong>{{user.subscription.sum}} ₽ в мес.</strong> начиная с <strong>{{user.subscription.freePeriodExpire}}</strong>
      пока Вы не отмените ее по меньшей мере за день до этой даты.
    </div>
  </div>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';
import {IUser} from '../../../../entity/user';
import {AuthStore} from '../../../../store/modules/Auth';
import Button from '../../common/Button.vue';
@Component({
  components: {Button}
})
export default class ProfileSubs extends Vue {

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
    color: #426df6;
  }
}
.sub-desc {
  font-size: 12px;
  color: #5A606F;
}
</style>

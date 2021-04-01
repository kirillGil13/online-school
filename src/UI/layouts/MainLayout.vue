<template>
  <v-app class="main-view">
    <MobileBar v-if="$adaptive.isMobile" :userId="user.id" :user-info="user"/>
    <v-main class="main-view__container pt-4">
      <v-container class="fluid-container" fluid>
        <div class="aside-view mr-7" v-if="!$adaptive.isMobile">
          <Sidebar :userInfo="user" :userId="user.id" @proceed="proceed"/>
        </div>
        <div class="content-main pt-0 mb-16">
          <v-main>
            <Confirm
                v-if="!user.isEmailConfirmed"
                :text="`Для полноценной работы необходимо подтвердить почту ${user.email}`"
                @show="showAlert"
                :show="show"
                @submit="sendCode"
            />
            <Confirm
                v-else-if="user.isEmailConfirmed && $route.query.accountId"
                :text="`Ваша почта ${user.email} успешно подверждена`"
                @show="showAlert"
                :show="show"
            />
            <router-view></router-view>
          </v-main>
        </div>
      </v-container>
      <v-tour name="tour" :steps="steps" :options="options"></v-tour>
    </v-main>
  </v-app>
</template>
<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';
import {AuthStore} from '@/store/modules/Auth';
import {IUser} from '@/entity/user';
import MobileBar from '@/UI/components/common/MobileBar.vue';
import Banner from '../components/common/Banner.vue';
import Sidebar from '../components/sidebar/Sidebar.vue';
import {ITourOptions, ITourSteps} from '../../entity/common/tour.types';
import {TourStore} from '../../store/modules/Tour';
import Confirm from '../components/common/Confirm.vue';
import {ConfirmEmailStore} from '../../store/modules/ConfirmEmail';


@Component({
  components: {
    Confirm,
    Banner,
    MobileBar,
    Sidebar
  },
})
export default class MainLayout extends Vue {

  show = true;

  proceed(): void {
    this.$router.push({name: this.$routeRules.Profile});
  }

  showAlert(show: boolean): void {
    this.show = show;
  }

  get user(): IUser {
    return AuthStore.user;
  }

  get options(): ITourOptions {
    return TourStore.options;
  }

  get steps(): ITourSteps[] {
    return TourStore.steps;
  }

  async mounted(): Promise<void> {
    if (TourStore.newUser) {
      this.$tours['tour'].start();
    }
    if (this.$route.query.accountId) {
      await ConfirmEmailStore.confirm({
        code: this.$route.query.code.toString(),
        accountId: parseInt(this.$route.query.accountId.toString())
      })
    }
  }

  async sendCode(): Promise<boolean> {
    const res = await ConfirmEmailStore.sendCode({email: this.user.email});
    if (res) {
      return true
    } else return false;
  }

}
</script>
<style lang="scss">
.main-view {
  font-family: 'Ubuntu' !important;
  width: 100%;

  &__container {
    max-width: 1440px;
    background-color: #fbfcfe;
  }
}

.aside-view {
  min-width: 290px;
}

.content-main {
  width: 100%;
  padding-top: 10px !important;
}

.fluid-container {
  max-width: 1440px !important;
}
</style>

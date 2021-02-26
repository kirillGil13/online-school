<template>
  <v-app class="main-view">
    <MobileBar v-if="isMobile" :userId="user.id" :user-info="user"/>
    <v-main class="main-view__container pt-4">
      <v-container class="fluid-container" fluid>
        <div class="aside-view mr-7" v-if="!isMobile">
          <Sidebar :userInfo="user" :userId="user.id" @proceed="proceed"/>
          <Banner/>
        </div>
        <div class="content-main pt-0 mb-16">
          <v-main>
            <router-view></router-view>
          </v-main>
        </div>
      </v-container>
    </v-main>
  </v-app>
</template>
<script lang="ts">
import {Component, Vue, Watch} from 'vue-property-decorator';
import {AuthStore} from '@/store/modules/Auth';
import {IUser} from '@/entity/user';
import MobileBar from '@/UI/components/common/MobileBar.vue';
import {AdaptiveStore} from '@/store/modules/Adaptive';
import Banner from '../components/common/Banner.vue';
import Sidebar from '../components/sidebar/Sidebar.vue';
import {RouterNameEnum} from '../../router/router.types';

@Component({
  components: {
    Banner,
    MobileBar,
    Sidebar
  },
})
export default class MainLayout extends Vue {
  get isMobile(): boolean {
    return AdaptiveStore.isMobile;
  }

  @Watch('$vuetify.breakpoint.name')
  onBreakpointChange(): void {
    AdaptiveStore.resolveAdaptive(this.$vuetify.breakpoint.name);
  }

  created(): void {
    AdaptiveStore.resolveAdaptive(this.$vuetify.breakpoint.name);
  }

  proceed(): void {
    this.$router.push({name: RouterNameEnum.Profile});
  }

  get user(): IUser {
    return AuthStore.user;
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
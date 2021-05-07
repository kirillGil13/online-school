<template>
  <div>
    <v-app-bar
        dense
        class="top_menu_bar"
        color="#FFFFFF"
    >
      <v-toolbar-title @click="proceed">
        <Logo width="120" class="mb-0 ml-0 justify-center"/>
      </v-toolbar-title>
      <v-spacer></v-spacer>
<!--      <svg-icon class="burger" name="Burger" @click="drawer = true"></svg-icon>-->
      <v-avatar size="34" @click="goTo">
        <v-img :src="userInfo.photoLink"></v-img>
      </v-avatar>
    </v-app-bar>

<!--    <v-navigation-drawer-->
<!--        v-model="drawer"-->
<!--        fixed-->
<!--        right-->
<!--        class="pa-2 drawer"-->
<!--    >-->
<!--      <account-badge :userInfo="userInfo" :user-id="userId" @proceed="goTo"/>-->
<!--      <Menu/>-->
<!--    </v-navigation-drawer>-->
  </div>
</template>

<script lang="ts">
import {Component, Prop, Vue} from 'vue-property-decorator';
import Menu from '@/UI/components/sidebar/Menu.vue';
import {IFakeUserInfo} from '@/entity/environment';
import AccountBadge from '@/UI/components/sidebar/AccountBadge.vue';
import {RouterNameEnum} from '../../../router/router.types';
import Logo from './Logo.vue';
@Component({
  components: {Logo, AccountBadge, Menu}
})
export default class MobileBar extends Vue {
  @Prop({required: true}) userInfo!: IFakeUserInfo;
  @Prop({required: true}) userId!: number;
  drawer = false;

  proceed(): void {
    this.$router.push({path: '/'});
  }

  goTo(): void {
    this.$router.push({name: RouterNameEnum.Profile});
  }
}
</script>

<style lang="scss">
header {
  width: 100%;
  .burger {
    width: 28px !important;
    height: 28px !important;
  }
}
.top_menu_bar {
  box-shadow: 0px 20px 17px rgba(0, 0, 0, 0.04) !important;
}
.drawer {
  position: relative;
  .close {
    position: absolute;
    bottom: 10px;
    left: 10px;
    font-size: 16px;
    color: #5F739C;
    .svg-icon {
      width: 28px !important;
      height: 28px !important;
      path {
        fill: #5F739C;
      }
    }
  }
}
</style>

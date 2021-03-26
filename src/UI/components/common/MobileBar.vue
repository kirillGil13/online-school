<template>
  <div>
    <v-app-bar
        dense
        elevation="3"
        color="#FFFFFF"
    >
      <v-toolbar-title @click="proceed">
        <v-img width="30" height="30" :src="require('@/UI/assets/logo.png')"></v-img>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <svg-icon class="burger" name="Burger" @click="drawer = true"></svg-icon>
    </v-app-bar>

    <v-navigation-drawer
        v-model="drawer"
        fixed
        right
        class="pa-2 drawer"
    >
      <account-badge :userInfo="userInfo" :user-id="userId"/>
      <Menu/>
      <v-spacer></v-spacer>
      <div class="close d-flex flex-row justify-start align-center" @click="drawer = false">
        <svg-icon class="mr-2" name="Close"></svg-icon>
        Закрыть
      </div>
    </v-navigation-drawer>
  </div>
</template>

<script lang="ts">
import {Component, Prop, Vue} from 'vue-property-decorator';
import Menu from '@/UI/components/sidebar/Menu.vue';
import {IFakeUserInfo} from '@/entity/environment';
import AccountBadge from '@/UI/components/sidebar/AccountBadge.vue';
import {RouterNameEnum} from '../../../router/router.types';
@Component({
  components: {AccountBadge, Menu}
})
export default class MobileBar extends Vue {
  @Prop({required: true}) userInfo!: IFakeUserInfo;
  @Prop({required: true}) userId!: number;
  drawer = false;

  proceed(): void {
    this.$router.push({name: RouterNameEnum.Main});
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

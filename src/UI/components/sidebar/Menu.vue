<template>
    <v-list :active-text-color="variables.menuActiveText" :collapse-transition="false" class="main-menu" nav rounded>
        <template v-for="(item, index) in items">
            <v-list-item v-if="!item.subMenu" :id="`step-${index + 1}`" color="" v-show="handleMenuItem(item)" :key="item.title" :ripple="!$adaptive.isMobile" exact exact-active-class="active-menu" :to="{name: proceed(item.route)}">
                <v-list-item-icon>
                    <svg-icon :name="item.iconName" class="menu__icon" height="24" width="24" />
                </v-list-item-icon>

                <v-list-item-title v-text="item.title" />
            </v-list-item>

            <v-list-group v-else no-action :key="item.title">
                <v-list-item slot="activator">
                    <v-list-item-icon>
                        <svg-icon :name="item.iconName" class="menu__icon" height="24" width="24" />
                    </v-list-item-icon>
                    <v-list-item-title v-text="item.title" />
                </v-list-item>
                <v-list-item v-for="subItem in item.subMenu" :key="subItem.title" :to="{ name: subItem.route }">
                    <v-list-item-title class="sub"> {{ subItem.title }}</v-list-item-title>
                </v-list-item>
            </v-list-group>
        </template>
    </v-list>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { IMainMenu } from '@/entity/menu/menu.types';
import variables, { IScssVariables } from '@/UI/assets/scss/variables/_variables.scss';
import { MenuStore } from '@/store/modules/Menu';
import {IUser} from '../../../entity/user';
import {AuthStore} from '../../../store/modules/Auth';
import {RouterNameEnum} from '../../../router/router.types';

@Component
export default class MenuComponent extends Vue {
    get variables(): IScssVariables {
        return variables;
    }

    get user(): IUser | null {
      return AuthStore.user;
    }

    get items(): IMainMenu[] {
        return MenuStore.items;
    }

    proceed(route: string): string {
      return route;
    }

    handleMenuItem(menuItem: IMainMenu): boolean {
      if (menuItem.route === this.$routeRules.Cabinet) {
        if (this.user!.isLeader) {
          return true;
        } else return false;
      } else return true;
    }


}
</script>
<style lang="scss" scoped>

.v-list-item--active {
  .v-list-item__icon {
    .svg-icon {
      fill: #4F79FF !important;
      path {
        fill: #4F79FF !important;
      }
    }
  }
}
.main-menu {
  .v-list-item {
    .v-list-item__title {
      font-size: 16px !important;
    }
  }
  .active-menu {

  }
}
</style>

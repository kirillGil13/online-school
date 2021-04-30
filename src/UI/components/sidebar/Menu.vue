<template>
    <v-list :active-text-color="variables.menuActiveText" :collapse-transition="false" class="main-menu" nav rounded>
        <template v-for="(item, index) in items">
            <v-list-item v-if="!item.subMenu" :id="`step-${index + 1}`" v-show="handleMenuItem(item)" :key="item.title" exact :to="{ name: item.route }">
                <v-list-item-icon>
                    <svg-icon :name="item.iconName" class="menu__icon" height="24" width="24" />
                </v-list-item-icon>
                <v-list-item-title v-text="item.title" /><span class="count-unread-message">{{item.title === 'Чат' &&  $route.name !== $routeRules.Chat &&  $route.name !== $routeRules.ChatMain && countUnreadMessages !== 0 ? countUnreadMessages : ''}}</span>
                
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
import { Component, Vue, Prop } from 'vue-property-decorator';
import { IMainMenu } from '@/entity/menu/menu.types';
import variables, { IScssVariables } from '@/UI/assets/scss/variables/_variables.scss';
import { MenuStore } from '@/store/modules/Menu';
import {IUser} from '../../../entity/user';
import {AuthStore} from '../../../store/modules/Auth';

@Component
export default class MenuComponent extends Vue {

  @Prop() readonly countUnreadMessages!: number;

  get variables(): IScssVariables {
      return variables;
  }

  get user(): IUser | null {
    return AuthStore.user;
  }

  get items(): IMainMenu[] {
      return MenuStore.items;
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
}

.count-unread-message {
  padding: 0px 6px;
  background: #434DFF;
  border-radius: 12px;
  color: #fff;
  font-weight: 500;
  font-size: 15px;
}
</style>

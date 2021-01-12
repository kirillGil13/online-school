<template>
    <v-list :active-text-color="variables.menuActiveText" :collapse-transition="false" class="main-menu" nav rounded>
        <template v-for="item in items">
            <v-list-item v-if="!item.subMenu" :key="item.title" :to="{ name: item.route }">
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

@Component
export default class MenuComponent extends Vue {
    get variables(): IScssVariables {
        return variables;
    }

    get items(): IMainMenu[] {
        return MenuStore.items;
    }
}
</script>
<style lang="scss" scoped></style>

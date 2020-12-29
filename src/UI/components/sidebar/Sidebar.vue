<template>
    <div class="account-info">
        <h3>ONELINKS.COM</h3>
        <account-badge :userInfo="userInfo" />
        <el-menu
            :active-text-color="variables.menuActiveText"
            :background-color="variables.menuBg"
            :collapse-transition="false"
            :text-color="variables.menuText"
            :unique-opened="false"
            class="account-info__main-menu"
            mode="vertical"
        >
            <Menu
                v-for="(item, index) in menu"
                :key="item.title"
                :iconColor="variables.menuText"
                :index="`${index}`"
                :item="item"
            />
        </el-menu>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { IFakeUserInfo } from '@/entity/environment';
import Menu from './Menu.vue';
import AccountBadge from './AccountBadge.vue';
import variables, { IScssVariables } from '@/UI/assets/scss/variables/_variables.scss';
import { MenuItem } from 'element-ui';
import { MenuStore } from '@/store/modules/Menu';

@Component({
    name: 'MainAccountCard',
    components: {
        Menu,
        AccountBadge,
    },
})
export default class extends Vue {
    @Prop({ required: true }) userInfo!: IFakeUserInfo;

    get variables(): IScssVariables {
        return variables;
    }
    get menu(): MenuItem[] {
        return MenuStore.items;
    }
}
</script>

<style lang="scss" scoped>
.account-info {
    max-width: 290px;
    border-radius: $main_border_radius;
    margin-bottom: 50px;
    padding: 20px;
    background-color: white;
    display: flex;
    align-items: center;
    flex-direction: column;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);

    &__main-menu {
        // border-radius: 16px;
        // overflow: hidden;
        width: 100%;
        padding: 0;
        list-style: none;
        font-style: normal;
        font-weight: normal;
        font-size: 16px;
        border: none;

        .is-active {
            background-color: #e8edfe !important;
            border-radius: $main_border_radius;
        }
    }
}
</style>

<template>
    <div class="account-info">
        <h3>ONELINKS.COM</h3>
        <account-badge :userInfo="userInfo" />
        <el-menu
            :background-color="variables.menuBg"
            :text-color="variables.menuText"
            :active-text-color="variables.menuActiveText"
            :unique-opened="false"
            :collapse-transition="false"
            mode="vertical"
            class="account-info__main-menu"
        >
            <MenuComponent
                v-for="(item, index) in menuData"
                :key="item.title"
                :item="item"
                :iconColor="variables.menuText"
                :index="`${index}`"
            />
        </el-menu>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { IFakeUserInfo, IMainMenu } from '@/entity/environment';
import MenuComponent from './MenuComponent.vue';
import AccountBadge from './AccountBadge.vue';
import variables from '@/UI/assets/scss/variables/_variables.scss';
@Component({
    name: 'MainAccountCard',
    components: {
        MenuComponent,
        AccountBadge
    }
})
export default class extends Vue {
    @Prop({ required: true }) menuData!: IMainMenu[];
    @Prop({ required: true }) userInfo!: IFakeUserInfo;
    get variables() {
        return variables;
    }
}
</script>

<style lang="scss" scoped>
.account-info {
    max-width: 290px;
    border-radius: 12px;
    padding: 20px;
    background-color: white;
    display: flex;
    align-items: center;
    flex-direction: column;
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
            border-radius: 12px;
        }
    }
}
</style>

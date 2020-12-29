<template>
    <v-container>
        <v-navigation-drawer class="aside-view" width="330px">
            <Sidebar :userInfo="user" />
            <Banner
                :bannerType="bannerTypes.PRO_ACCOUNT_PROMO"
                :qrcode="'https://miro.medium.com/max/495/1*PNniLVIC_Hc7gNIxjvWPWg.png'"
            />
        </v-navigation-drawer>
        <v-container>
            <v-main class="main-view">
                <router-view></router-view>
            </v-main>
            <el-footer></el-footer>
        </v-container>
    </v-container>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Banner from '../common/Banner.vue';
import Sidebar from '../sidebar/Sidebar.vue';
import { BannerTypeEnum } from '@/entity/common/baner.types';
import { AuthStore } from '@/store/modules/Auth';
import { IUser } from '@/entity/user';

@Component({
    components: {
        Sidebar,
        Banner,
    },
})
export default class MainLayout extends Vue {
    get user(): IUser {
        return AuthStore.user;
    }

    get bannerTypes(): typeof BannerTypeEnum {
        return BannerTypeEnum;
    }
}
</script>
<style lang="scss">
.main-view {
  padding: 21px 22px 21px 36px !important;
}

.aside-view {
    padding-top: 15px !important;
    padding-left: 15px !important;
}
</style>

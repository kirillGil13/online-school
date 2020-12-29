<template>
    <el-container>
        <el-aside class="aside-view" width="330px">
            <Sidebar :userInfo="fakeUserInfo" />
            <Banner
                :bannerType="bannerTypes.PRO_ACCOUNT_PROMO"
                :qrcode="'https://miro.medium.com/max/495/1*PNniLVIC_Hc7gNIxjvWPWg.png'"
            />
        </el-aside>
        <el-container>
            <el-main class="main-view">
                <router-view></router-view>
            </el-main>
            <el-footer></el-footer>
        </el-container>
    </el-container>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Banner from '../common/Banner.vue';
import Sidebar from '../sidebar/Sidebar.vue';
import { IFakeUserInfo } from '@/entity/environment';
import { BannerTypeEnum } from '@/entity/common/baner.types';

@Component({
    components: {
        Sidebar,
        Banner,
    },
})
export default class MainLayout extends Vue {
    private fakeUserInfo: IFakeUserInfo = {
        name: 'Денис',
        surname: 'Денисов',
        login: 'denis',
        avatar: 'https://upload.wikimedia.org/wikipedia/en/4/48/Suzumiya_Haruhi.jpg',
    };

    get bannerTypes(): typeof BannerTypeEnum {
        return BannerTypeEnum;
    }
}
</script>
<style lang="scss">
.main-view {
    padding: 15px !important;
}

.aside-view {
    padding-top: 15px !important;
    padding-left: 15px !important;
}
</style>

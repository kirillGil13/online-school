<template>
    <div>
        <QrCodeBanner v-if="isQrCode" :qrcode="qrcode" />
        <PromoBanner v-else-if="isProAccountPromo" />
        <InviteBanner v-else-if="isInviteBanner" />
    </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator';
import { BannerTypeEnum } from '@/entity/common/baner.types';
import PromoBanner from './banners/Promo.vue';
import QrCodeBanner from './banners/QrCode.vue';
import InviteBanner from './banners/Invite.vue';
import { Route } from 'vue-router';
import { RouterNameEnum } from '@/router/router.types';

@Component({
    components: {
        PromoBanner,
        QrCodeBanner,
        InviteBanner,
    },
})
export default class Banner extends Vue {
    bannerType: BannerTypeEnum = BannerTypeEnum.PRO_ACCOUNT_PROMO;

    created(): void {
        this.getBannerFromRoute(this.$route);
    }

    @Watch('$route')
    onRouteChange(route: Route): void {
        this.getBannerFromRoute(route);
    }

    get isQrCode(): boolean {
        return this.bannerType === BannerTypeEnum.QRCODE;
    }
    get isInviteBanner(): boolean {
        return this.bannerType === BannerTypeEnum.INVITE_BUNNER;
    }
    get isProAccountPromo(): boolean {
        return this.bannerType === BannerTypeEnum.PRO_ACCOUNT_PROMO;
    }

    getBannerFromRoute(route: Route): void {
        switch (route.name) {
            case RouterNameEnum.Candidates:
                this.bannerType = BannerTypeEnum.QRCODE;
                break;
            case RouterNameEnum.Partners:
                this.bannerType = BannerTypeEnum.PRO_ACCOUNT_PROMO;
                break;
            default:
                this.bannerType = BannerTypeEnum.INVITE_BUNNER;
                break;
        }
    }
}
</script>
MainLayout

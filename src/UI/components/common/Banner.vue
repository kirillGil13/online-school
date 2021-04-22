<template>
    <div class="banner__wrapper">
        <QrCodeBanner v-if="isQrCode"/>
        <Subscribe v-else-if="isSubscribeBanner" v-on="$listeners"/>
        <InviteBanner v-else-if="isInviteBanner" />
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { BannerTypeEnum } from '@/entity/common/baner.types';
import QrCodeBanner from './banners/QrCode.vue';
import InviteBanner from './banners/Invite.vue';
import Subscribe from './banners/Subscribe.vue';

@Component({
    components: {
      Subscribe,
        QrCodeBanner,
        InviteBanner,
    },
})
export default class Banner extends Vue {
    bannerType: BannerTypeEnum = BannerTypeEnum.SUBSCRIBE;

    get isQrCode(): boolean {
        return this.bannerType === BannerTypeEnum.QRCODE;
    }
    get isInviteBanner(): boolean {
        return this.bannerType === BannerTypeEnum.INVITE;
    }
    get isSubscribeBanner(): boolean {
        return this.bannerType === BannerTypeEnum.SUBSCRIBE;
    }
}
</script>
<style lang="scss" scoped>
.banner__wrapper{
  width: 100%;
  position: relative;
}
</style>

<template>
    <div>
        <QrCodeBanner
            :qrcode="qrcode"
            v-if="bannerType === bannerTypes.QRCODE"
        />
        <PromoBanner v-if="bannerType === bannerTypes.PRO_ACCOUNT_PROMO" />
        <InviteBanner v-if="bannerType === bannerTypes.INVITE_BUNNER" />
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { BannerTypeEnum } from '@/entity/common/baner.types';
import PromoBanner from './banners/Promo.vue';
import QrCodeBanner from './banners/QrCode.vue';
import InviteBanner from './banners/Invite.vue';

@Component({
    components: {
        PromoBanner,
        QrCodeBanner,
        InviteBanner,
    },
})
export default class Banner extends Vue {
    @Prop({ required: true }) bannerType!: string;
    @Prop({ required: false }) qrcode!: string;
    private get bannerTypes() {
        return BannerTypeEnum;
    }
}
</script>

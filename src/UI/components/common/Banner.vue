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
    private subscribe(): void {
        this.$router.push('link na subscribe');
    }
    private copyLink(): void {
        this.$emit('copyLink');
    }
    private get bannerTypes() {
        return BannerTypeEnum;
    }
}
</script>

//
<style lang="scss">
// .banner {
//     // min-height: 200px;
//     // max-width: 330px;
//     // display: flex;
//     // align-items: center;
//     // background-color: $white;
//     // justify-content: center;
//     // padding: 16px 0px;
//     // box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
//     // border-radius: $main_border_radius;
//     &__promo {
//         background-color: #e1f2eb !important;
//         border: 1px solid rgba(39, 174, 96, 0.12);
//     }
//     &__invite {
//         background-color: rgba(66, 109, 246, 0.12) !important;
//         border: 1px solid rgba(66, 109, 246, 0.12);
//     }
//     &__title {
//         font-size: 18px;
//         text-align: center;
//     }
//     &__descripton {
//         font-family: Ubuntu;
//         font-style: normal;
//         font-weight: normal;
//         color: $secondary_text;
//         font-size: $main_font_size;
//         text-align: center;
//     }
//     &__content {
//         display: flex;
//         flex-direction: column;
//         align-items: center;
//         justify-content: center;
//     }
//     &__button {
//         font-family: $font-family-base;
//         height: 50px;
//         border-radius: $main_border_radius;
//         padding: 16px, 24px;
//     }
//     &__paper-plane {
//         transform: rotate(320deg);
//     }
//     &__star-container {
//         background-color: #cbeada;
//         min-height: 100px;
//         min-width: 100px;
//         display: flex;
//         justify-content: center;
//         align-items: center;
//         border-radius: $main_border_radius;
//     }
//     &__qrcode {
//         height: 95%;
//         width: 95%;
//     }
// }
//
</style>

//
<style lang="scss" scoped>
// .green {
//     background-color: $green;
//     color: $white;
// }
// .blue {
//     background-color: $blue;
//     color: $white;
// }
//
</style>

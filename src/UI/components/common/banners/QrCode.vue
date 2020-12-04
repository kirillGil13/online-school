<template>
    <div class="banner">
        <img class="banner__qrcode" :src="qrcode" alt="qr код" />
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
@Component
export default class QrCodeBanner extends Vue {
    @Prop({ required: true }) qrcode!: string;
}
</script>

<style lang="scss" scoped>
.banner {
    &__qrcode {
        height: 95%;
        width: 95%;
    }
}
</style>

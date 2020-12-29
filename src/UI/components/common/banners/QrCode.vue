<template>
    <div class="banner">
        <vue-qrcode :value="user.link" width="225" version="medium"/>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import VueQrcode from 'vue-qrcode';
import { IUser } from '@/entity/user';
import { AuthStore } from '@/store/modules/Auth';
@Component({
    components: {
        VueQrcode,
    },
})
export default class QrCodeBanner extends Vue {
    get user(): IUser {
        return AuthStore.user;
    }
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

<template>
    <div
        :class="{
            banner: true,
            banner__promo: bannerType === 'proAccountPromo',
            banner__invite: bannerType === 'inviteBanner'
        }"
    >
        <div v-if="bannerType === 'qrcode'">
            <img src="qrcode" alt="qr код" />
        </div>
        <div
            class="banner__content"
            v-else-if="bannerType === 'proAccountPromo'"
        >
            <p class="banner__descripton">
                Подключите PRO аккаунт, чтобы получить доступ ко всем материалам
            </p>
            <el-button class="banner__button" @click="subscribe"
                >Оформить подписку</el-button
            >
        </div>
        <div class="banner__content" v-else>
            <h3 class="banner__title">Пригласить кандидата</h3>
            <p class="banner__descripton">
                Отправьте ссылку кандидату, чтобы прокачать его намного
                эффективней
            </p>
            <el-button class="banner__button" @click="copyLink"
                >Скопировать ссылку</el-button
            >
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class Banner extends Vue {
    @Prop({ required: true }) bannerType!: string;
    @Prop({ required: false }) qrcode!: string;
    private subscribe(): void {
        this.$router.push('link na subscribe');
    }
    private copyLink(): void {
        this.$emit('copyLink');
    }
}
</script>

<style lang="scss">
.banner {
    min-height: 200px;
    max-width: 325px;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 16px 0px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);

    &__promo {
        background-color: rgba(39, 174, 96, 0.12);
    }
    &__invite {
        background-color: rgba(66, 109, 246, 0.12);
    }
    &__title {
        font-size: 18px;
    }
    &__descripton {
        font-family: Ubuntu;
        font-style: normal;
        font-weight: normal;
        font-size: 12px;
        text-align: center;
    }
    &__content {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }
    &__button {
        background-color: $blue;
        font-family: $font-family-base;
        color: $white;
        border-radius: 12px;
        padding: 16px, 24px;
    }
}
</style>

<template>
    <div
        :class="{
            banner: true,
            banner__promo: bannerType === 'proAccountPromo',
            banner__invite: bannerType === 'inviteBanner',
        }"
    >
        <div v-if="bannerType === 'qrcode'">
            <img class="banner__qrcode" :src="qrcode" alt="qr код" />
        </div>
        <div
            class="banner__content"
            v-else-if="bannerType === 'proAccountPromo'"
        >
            <div class="banner__star-container">
                <svg-icon
                    name="Star"
                    height="40"
                    width="40"
                    :color="`${variables.lightGreen} ${variables.green}`"
                />
            </div>
            <p class="banner__descripton">
                Подключите PRO аккаунт, чтобы получить доступ ко всем материалам
            </p>
            <!-- тут будет common/Button -->
            <el-button class="banner__button" @click="subscribe"
                >Оформить подписку</el-button
            >
            <!-- тут будет common/Button -->
        </div>
        <div class="banner__content" v-else>
            <svg-icon
                name="PaperPlane"
                :color="variables.menuActiveText"
                class="banner__paper-plane"
                height="45"
                width="45"
            />
            <div>
                <h3 class="banner__title">Пригласить кандидата</h3>
                <p class="banner__descripton">
                    Отправьте ссылку кандидату, чтобы прокачать его намного
                    эффективней
                </p>
            </div>
            <!-- тут будет common/Button -->
            <el-button size="medium" class="banner__button" @click="copyLink"
                >Скопировать ссылку</el-button
            >
            <!-- тут будет common/Button -->
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import variables from '@/UI/assets/scss/variables/_variables.scss';

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
    get variables() {
        return variables;
    }
}
</script>

<style lang="scss">
.banner {
    min-height: 200px;
    max-width: 325px;
    display: flex;
    align-items: center;
    background-color: $white;
    justify-content: center;
    padding: 16px 0px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
    border-radius: $main_border_radius;
    &__promo {
        background-color: #e1f2eb;
        border: 1px solid rgba(39, 174, 96, 0.12);
    }
    &__invite {
        background-color: rgba(66, 109, 246, 0.12);
        border: 1px solid rgba(66, 109, 246, 0.12);
    }
    &__title {
        font-size: 18px;
        text-align: center;
    }
    &__descripton {
        font-family: Ubuntu;
        font-style: normal;
        font-weight: normal;
        color: $secondary_text;
        font-size: $main_font_size;
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
        height: 50px;
        border-radius: $main_border_radius;
        padding: 16px, 24px;
    }
    &__paper-plane {
        transform: rotate(320deg);
    }
    &__star-container {
        background-color: #cbeada;
        min-height: 100px;
        min-width: 100px;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: $main_border_radius;
    }
    &__qrcode {
        height: 95%;
        width: 95%;
    }
}
</style>

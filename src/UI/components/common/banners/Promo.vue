<template>
    <div class="banner banner__promo">
        <div class="banner__content">
            <div class="banner__star-container">
                <svg-icon
                    name="Star"
                    height="40"
                    width="40"
                    :color="`${variables.lightGreen} ${variables.green}`"
                />
            </div>
            <p class="banner__descripton">
                Подключите PRO аккаунт, чтобы <br />
                получить доступ ко всем материалам
            </p>
            <!-- тут будет common/Button -->
            <el-button class="banner__button green" @click="subscribe"
                >Оформить подписку</el-button
            >
            <!-- тут будет common/Button -->
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import variables from '@/UI/assets/scss/variables/_variables.scss';
@Component
export default class PromoBanner extends Vue {
    get variables() {
        return variables;
    }
}
</script>

<style lang="scss" scoped>
.green {
    background-color: $green;
    color: $white;
}
.banner {
    &__promo {
        background-color: #e1f2eb !important;
        border: 1px solid rgba(39, 174, 96, 0.12);
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
}
</style>

<template>
    <div class="banner banner__invite">
        <div class="banner__content">
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
                    Отправьте ссылку кандидату, чтобы <br />
                    прокачать его намного эффективней
                </p>
            </div>
            <!-- тут будет common/Button -->
            <el-button size="medium" class="banner__button blue" @click="copyLink">Скопировать ссылку</el-button>
            <!-- тут будет common/Button -->
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import variables, {IScssVariables} from '@/UI/assets/scss/variables/_variables.scss';
@Component
export default class InviteBanner extends Vue {
    get variables(): IScssVariables {
        return variables;
    }
    private copyLink(): void {
        this.$emit('copyLink');
    }
}
</script>

<style lang="scss" scoped>
.blue {
    background-color: $blue;
    color: $white;
}
.banner {
    &__invite {
        background-color: rgba(66, 109, 246, 0.12) !important;
        border: 1px solid rgba(66, 109, 246, 0.12);
    }
    &__paper-plane {
        transform: rotate(320deg);
    }
}
</style>

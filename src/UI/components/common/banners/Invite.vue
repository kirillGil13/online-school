<template>
    <div class="banner banner__invite">
        <div class="banner__content">
            <svg-icon
                name="PaperPlane"
                :color="variables.menuActiveText"
                class="banner__paper-plane"
                height="69"
                width="72"
            />
            <div>
                <h3 class="banner__title">Пригласить кандидата</h3>
                <p class="banner__descripton">
                    Отправьте ссылку кандидату, чтобы <br />
                    прокачать его намного эффективней
                </p>
            </div>
            <!-- тут будет common/Button -->
            <v-btn size="medium" class="banner__button blue" @click="copyLink">Скопировать ссылку</v-btn>
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
  padding: 66px 34px 16px 34px;
    &__invite {
        background-color: rgba(66, 109, 246, 0.12) !important;
        border: 1px solid rgba(66, 109, 246, 0.12);
    }
    &__paper-plane {
      position: absolute;
      left: 35%;
      top: -7%;
    }
    &__title {
      font-size: 18px;
      margin-bottom: 12px;
    }
    &__descripton {
      font-size: 12px;
    }
}
</style>

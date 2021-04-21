<template>
    <div class="banner banner__promo">
        <div class="banner__content">
            <Subscription banner/>
            <Button small full-width @submit="$emit('show')">Оформить подписку</Button>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import variables, { IScssVariables } from '@/UI/assets/scss/variables/_variables.scss';
import Button from '@/UI/components/common/Button.vue';
import Subscription from '../../subscription/Subscription.vue';
@Component({
  components: {Subscription, Button}
})
export default class SubscribeBanner extends Vue {
    get variables(): IScssVariables {
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
  padding: 24px 16px 24px 16px;
    &__promo {
      background: rgba(39, 174, 96, 0.12);
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
  &__description {
    text-align: center;
    font-size: 12px;
    margin-top: 12px;
    margin-bottom: 0 !important;
  }
  button {
    margin-top: 16px;
    width: 100%;
    background: #27AE60;
  }
}
</style>

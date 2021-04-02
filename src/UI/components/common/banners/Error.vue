<template>
  <v-row class="in-dev-banner">
    <div class="in-dev-banner__container d-flex flex-column justify-center align-center pa-6">
      <h2 class="in-dev-title">Что то пошло не так...</h2>
      <div class="in-dev-desc">Скорее всего истек срок действия ссылки.</div>
    </div>
  </v-row>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
@Component
export default class Error extends Vue {
}
</script>

<style lang="scss" scoped>
.in-dev-banner {
  &__container {
    width: 100%;
    background: #F2F2F2;
    border: 1px solid rgba(87, 81, 183, 0.12);
    border-radius: 12px;
    text-align: center;
    .in-dev-title {
      text-align: center;
      font-size: 24px;
    }
    .in-dev-desc {
      color: #828282;
      text-align: center;
      font-size: 12px;
    }
  }
}
</style>

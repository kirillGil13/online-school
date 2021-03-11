<template>
  <v-row class="in-dev-banner">
      <div class="in-dev-banner__container d-flex flex-column justify-center align-center pa-6">
        <v-img max-height="120" max-width="120" :src="require('../../../assets/in-dev.png')"></v-img>
        <h2 class="in-dev-title">Раздел находится в разработке</h2>
        <div class="in-dev-desc">Мы усердно работаем над функционалом. Скоро здесь появится нечто потрясающее.</div>
      </div>
  </v-row>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
@Component
export default class InDev extends Vue {
}
</script>

<style lang="scss" scoped>
.in-dev-banner {
  &__container {
    width: 100%;
    background: #F2F2F2;
    border: 1px solid rgba(87, 81, 183, 0.12);
    border-radius: 12px;
    .in-dev-title {
      font-size: 24px;
    }
    .in-dev-desc {
      color: #828282;
      font-size: 12px;
    }
  }
}
</style>

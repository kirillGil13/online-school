<template>
  <div class="content landing">
    <div class="pa-6 landing__wrapper">
      <router-view />
    </div>
  </div>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';

@Component
export default class LandingLayout extends Vue {}
</script>

<style lang="scss">
.landing {
  justify-content: center;
  align-items: center;
  background-color: transparent !important;

  &__wrapper {
    width: 100%;
    padding: 24px;
  }
}
</style>
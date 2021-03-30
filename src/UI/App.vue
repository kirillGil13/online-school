<template>
  <v-app class="main-view">
    <v-main class="main-view__container">
      <router-view/>
    </v-main>
  </v-app>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';
import {AuthStore} from '@/store/modules/Auth';

@Component
export default class App extends Vue {

  created(): void {
    AuthStore.load();
  }
}
</script>
<style lang="scss" scoped></style>

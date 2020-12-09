<template>
  <div id="app">
    <main-layout>
      <router-view></router-view>
    </main-layout>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import MainLayout from '@/UI/components/MainLayout.vue';
@Component({
  components: {
    MainLayout
  }
})
export default class App extends Vue {}
</script>
<style lang="scss"></style>

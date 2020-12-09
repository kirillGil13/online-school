<template>
  <div class="search">
    <svg-icon name="Search"></svg-icon>
    <input type="search" name="search" id="search" placeholder="Поиск" />
  </div>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class Search extends Vue {}
</script>
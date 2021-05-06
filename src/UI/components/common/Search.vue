<template>
    <div class="search">
        <svg-icon name="Search"></svg-icon>
        <input type="search" v-model="searchBody" name="search" id="search" placeholder="Поиск" @input="$emit('search', searchBody)" />
    </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class Search extends Vue {
  searchBody = '';
}
</script>
<style lang="scss">
.search {
  svg {
    path {
      fill: #5A606F !important;
    }
  }
}
</style>

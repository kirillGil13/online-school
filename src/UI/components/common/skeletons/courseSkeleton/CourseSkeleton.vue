<template>
  <v-sheet
      color="#F2F2F2"
  >
    <v-skeleton-loader
        type="image"
    ></v-skeleton-loader>
  </v-sheet>
</template>

<script lang="ts">

import {Component, Vue} from 'vue-property-decorator';

@Component
export default class CourseSkeleton extends Vue {}
</script>

<style lang="scss">

</style>

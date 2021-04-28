<template>
<div class="not_found text-center">404 not found</div>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';

@Component
export default class NotFound extends Vue {}
</script>

<style lang="scss">
.not_found {
  font-size: 46px;
}
</style>

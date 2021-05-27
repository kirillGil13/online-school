<template>
<div class="info-note px-4 py-3" :class="[error && 'info-error']">
  <div class="info-note__title">{{title}}</div>
  <div class="info-note__subtitle mt-2" v-if="subtitle">{{subtitle}}</div>
</div>
</template>

<script lang="ts">
import {Component, Prop, Vue} from 'vue-property-decorator';

@Component
export default class InfoNote extends Vue {
  @Prop() readonly title!: string;
  @Prop() readonly subtitle!: string;
  @Prop({default: false, type: Boolean}) readonly error!: boolean;
}
</script>

<style lang="scss">
</style>

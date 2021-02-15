<template>
  <vue-ellipse-progress
      :progress="progress"
      :size="12"
      :color="color"
      :emptyColor="emptyColor"
      :thickness="6"
      :emptyThickness="6"
      line="butt"
      :legend="false"
  />
</template>
<script lang="ts">
import {Component, Prop, Vue} from 'vue-property-decorator';

@Component
export default class ProgressCircle extends Vue {
  @Prop({default: 0}) readonly progress!: number;
  @Prop() readonly color!: string;
  @Prop() readonly emptyColor!: string;
}
</script>
<style lang="scss">
</style>

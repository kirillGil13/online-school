<template>
  <div v-show="selected">
    <slot></slot>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class TabsContent extends Vue {
  @Prop({ default: false }) readonly selected!: boolean;
  @Prop() readonly name!: boolean;
}
</script>
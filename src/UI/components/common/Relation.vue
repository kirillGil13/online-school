<template>
  <span class="relation" @click="$emit('click')">
    <svg-icon :name="svgName" class="svg-wh"></svg-icon>{{ title }}
  </span>
</template>

<script lang="ts">
import {Component, Prop, Vue} from "vue-property-decorator";

@Component
export default class Relation extends Vue {
  @Prop() readonly svgName!: string;
  @Prop() readonly title!: string;
}

</script>

<style lang="scss">
.relation {
  cursor: pointer;
  margin-right: 36px;
}
</style>
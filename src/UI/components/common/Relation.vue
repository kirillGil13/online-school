<template>
    <span class="relation d-flex flex-row align-center" @click="$emit('click')">
      <div class="icon-container"><svg-icon :name="svgName" :class="[svgClass]"></svg-icon></div>
        {{ title }}
    </span>
</template>

<script lang="ts">
import {Component, Prop, Vue} from 'vue-property-decorator';

@Component
export default class Relation extends Vue {
  @Prop() readonly svgName!: string;
  @Prop() readonly title!: string;
  @Prop({default: ''}) readonly svgClass!: string;
}
</script>

<style lang="scss">
.relation {
  cursor: pointer;
  margin-right: 36px;
  .icon-container {
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    width: 36px;
    height: 36px;
    background: rgba(66, 109, 246, 0.12);
    margin-right: 8px;
    svg {
      width: 16px !important;
      height: 16px !important;
    }
  }
}
</style>

<template>
    <span class="relation d-flex flex-row align-center" @click="$emit('click')">
      <div :class="['icon-container', active ? 'active' : '']"><svg-icon :name="svgName" :class="[svgClass]"></svg-icon></div>
        <template v-if="!isRaiting">
          {{ title }}
        </template>
        <template v-else>
          <p class="mb-0">{{title}}</p>
        </template>
    </span>
</template>

<script lang="ts">
import {Component, Prop, Vue} from 'vue-property-decorator';

@Component
export default class Relation extends Vue {
  @Prop({default: false}) active!: boolean;
  @Prop() readonly svgName!: string;
  @Prop() readonly title!: string | number;
  @Prop({default: ''}) readonly svgClass!: string | string[];
  @Prop({default: false}) readonly isRaiting?: boolean
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
      path {
        fill: #5F739C;
      }
    }
    &.active {
      background: #426DF6 !important;
      svg {
        path {
          fill: #FFFFFF !important;
        }
      }
    }
  }

  p {
    font-weight: 500;
    font-size: 16px;
    line-height: 24px;
    display: flex;
    align-items: center;
    color: #060516;
  }
}
</style>

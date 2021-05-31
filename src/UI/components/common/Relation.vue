<template>
    <div class="relation d-flex flex-row align-center" @click="$emit('click')">
      <div :class="['icon-container', active ? 'active' : '', svgClass ? svgClass : '', !isPurchased && 'disabled']"><svg-icon :name="svgName" ></svg-icon></div>
        <div v-if="!isRaiting" :style="{lineHeight: '100%', color: !isPurchased ? '#989898' : '#000000' }">
          {{ title }}
        </div>
        <template v-else>
          <p class="mb-0">{{title}}</p>
        </template>
    </div>
</template>

<script lang="ts">
import {Component, Prop, Vue} from 'vue-property-decorator';

@Component
export default class Relation extends Vue {
  @Prop({default: false}) active!: boolean;
  @Prop() readonly svgName!: string;
  @Prop() readonly title!: string | number;
  @Prop({default: true}) readonly isPurchased!: boolean;
  @Prop({default: ''}) readonly svgClass!: string | string[];
  @Prop({default: false}) readonly isRaiting?: boolean
}
</script>

<style lang="scss">
.relation {
  cursor: pointer;
  margin-right: 36px;
  &:nth-last-child(1) {
    margin-right: 0;
  }
  .icon-container {
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    width: 36px;
    height: 36px;
    background: rgba(66, 109, 246, 0.12);
    margin-right: 8px;
    &.disabled {
      background: rgba(66, 109, 246, 0.12);
      svg {
        opacity: 0.4;
      }
    }
    svg {
      width: 16px ;
      height: 16px ;
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

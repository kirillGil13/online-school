<template>
    <v-col class="badge px-3 py-2">
        <div class="badge__title">
            <slot name="title" />
        </div>
        <div :class="['badge__default subs', subs ? 'active' : 'in-active']">
            <slot name="sub" />
        </div>
      <div :class="['badge__default', profit || loss ? 'mt-3' : '']">
            <div><slot name="default" /></div>
            <div :class="['badge__stats profit', loss ? 'loss' : '']" v-if="profit || loss">
              <template v-if="profit">+</template>
              <template v-else>-</template>
              <slot name="stats"/>
              <svg-icon class="ml-1" name="Badge_Arrow"></svg-icon>
            </div>
        </div>
    </v-col>
</template>

<script lang="ts">
import {Component, Prop, Vue} from 'vue-property-decorator';
@Component
export default class Badge extends Vue {
  @Prop({default: false}) readonly subs!: boolean;
  @Prop() readonly sub!: boolean;
  @Prop() readonly profit!: boolean;
  @Prop({default: false}) readonly loss!: boolean;
}
</script>

<style lang="scss">
.badge {
    min-width: 100px;
    margin-bottom: 8px;
    border-radius: $main_border_radius;
    border: 1px solid #e8edfe;
    &:nth-last-child(1) {
      margin-bottom: 0;
    }
    &__title {
        font-family: $font-family-base;
        font-size: $main_font_size;
        color: $link;
    }
    &__default {
      color: #060516;
      font-size: 24px;
      font-weight: bold;
      display: flex;
      flex-direction: row;
      align-items: flex-end;
      &.subs {
        font-size: 14px;
        &.active {
          color: #27AE60;
        }
        &.in-active {
          color: #EB5757;
        }
      }
    }
    &__stats {
      font-size: 14px;
      margin-left: 12px;
      margin-bottom: 3px;
      &.profit {
        color: #27AE60;
      }
      &.loss {
        color: #EB5757 !important;
        .svg-icon {
          transform: rotate(180deg);
          path {
            fill: #EB5757 !important;
          }
        }
      }
    }
}
</style>

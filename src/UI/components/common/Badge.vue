<template>
    <v-col class="badge px-6 py-4">
        <div class="badge__title">
            <slot name="title" />
        </div>
        <div :class="['badge__default subs', subs ? 'active' : 'in-active']">
            <slot name="sub" />
        </div>
      <div :class="['badge__default mt-3', extraAction && 'justify-space-between', $adaptive.isMobile && 'flex-column align-start']">
        <div class="d-flex flex-row align-end">
          <div>
            <slot name="default" />
          </div>
          <router-link class="link mt-5" :to="{name: linkName}" v-if="linkName">
            <slot name="link"/>
            <svg-icon name="Arrow_Right"></svg-icon>
          </router-link>
          <div :class="['badge__stats', profit ? 'profit' : 'loss']" v-if="profit !== null">
            <template v-if="profit !== null">{{profit ? '+' : '-'}}</template>
            <slot name="stats"/>
            <svg-icon class="ml-1" name="Badge_Arrow"></svg-icon>
          </div>
        </div>
        <div class="d-flex" :class="[$adaptive.isMobile && 'mt-3 full-width']" v-if="extraAction">
          <slot name="extraAction"></slot>
        </div>
        </div>
    </v-col>
</template>

<script lang="ts">
import {Component, Prop, Vue} from 'vue-property-decorator';
@Component
export default class Badge extends Vue {
  @Prop({default: false}) readonly subs!: boolean;
  @Prop({default: false, type: Boolean}) readonly extraAction!: boolean;
  @Prop() readonly linkName!: string;
  @Prop() readonly sub!: boolean;
  @Prop() readonly profit!: boolean;
}
</script>

<style lang="scss">
.badge {
    min-width: 100px;
    margin-bottom: 8px;
    border-radius: $main_border_radius;
    border: 1px solid #F2F2F2;
  box-shadow: 0px 14px 12px rgb(0 0 0 / 1%);
  background: #FFFFFF;
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
      .link {
        font-size: 14px;
        color: #426DF6;
        font-weight: normal;
        cursor: pointer;
        .svg-icon {
          margin-left: 8px;
          width: 11px !important;
          height: 16px !important;
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

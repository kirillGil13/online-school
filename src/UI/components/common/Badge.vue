<template>
    <v-col class="badge px-3 py-2">
        <div class="badge__title">
            <slot name="title" />
        </div>
        <div :class="['badge__default subs', subs ? 'active' : 'in-active']">
            <slot name="sub" />
        </div>
      <div :class="['badge__default', profit || !profit ? 'mt-3' : '']">
            <div><slot name="default" /></div>
            <router-link class="link mt-5" :to="{name: linkName}" v-if="linkName"><slot name="link"/><svg-icon name="Arrow_Right"></svg-icon></router-link>
            <div :class="['badge__stats', profit ? 'profit' : 'loss']" v-if="profit">
              <template v-if="profit">{{profit ? '+' : '-'}}</template>
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
      .link {
        font-size: 16px;
        color: #426DF6;
        font-weight: normal;
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

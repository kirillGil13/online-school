<template>
  <v-row :class="['top_bar', isBordered ? 'box-container pa-2' : 'py-24']" ref="topBar">
    <v-col :class="['bar_title', isMobile ? 'pa-3' : '']">
      <router-link v-if="route" :to="{ name: route.name }" class="link">
        <svg-icon name="Arrow_Left" class="svg-fill-none"></svg-icon>
        {{ route.label }}
      </router-link>
      <h1 v-if="title">{{ title }}</h1>
      <span class="desc" v-if="description">{{ description }}</span>
    </v-col>
    <v-col class="top_bar_right" v-if="$slots[0]">
      <slot></slot>
    </v-col>
  </v-row>
</template>
<script lang="ts">
import {Component, Prop, Vue} from 'vue-property-decorator';
import {HeaderRouteType} from '@/entity/common/header.types';
import {AdaptiveStore} from '@/store/modules/Adaptive';

@Component
export default class Header extends Vue {
  @Prop({default: ''}) readonly title!: string;
  @Prop() readonly description!: string;
  @Prop() readonly route!: HeaderRouteType;
  @Prop({default: false}) readonly isBordered!: boolean;
  @Prop({default: ''}) readonly hash!: string;

  get isMobile(): boolean {
    return AdaptiveStore.isMobile;
  }
}
</script>
<style lang="scss">
.top_bar {
  display: flex !important;
  justify-content: space-between !important;
  box-sizing: border-box;

  h1 {
    margin-bottom: 0;
    margin-top: 6px;
    font-size: 24px;
  }

  a {
    text-decoration: none;
    color: #426df6;
  }

  .desc {
    margin-top: 8px;
    color: #828282;
  }

  .link {
    display: flex;
    align-items: center;
    justify-content: left;
  }

  .svg-icon {
    margin-right: 14px;
  }
}
</style>

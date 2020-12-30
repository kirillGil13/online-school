<template>
    <v-row :class="['top_bar', isBordered ? 'box-container' : 'py-24']" ref="topBar">
        <v-col cols="8">
            <router-link v-if="route" :to="{ name: route.name }" class="link">
                <svg-icon name="Arrow_Left" class="svg-fill-none mr-14"></svg-icon>
                {{ route.label }}
            </router-link>
            <h1 v-if="title">{{ title }}</h1>
            <span v-if="description">{{ description }}</span>
        </v-col>
        <v-col cols="4">
            <slot></slot>
        </v-col>
    </v-row>
</template>
<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { HeaderRouteType } from '@/entity/common/header.types';

@Component
export default class Header extends Vue {
    @Prop({ default: '' }) readonly title!: string;
    @Prop({ default: '' }) readonly description!: string;
    @Prop({ default: '' }) readonly route!: HeaderRouteType;
    @Prop({ default: false }) readonly isBordered!: boolean;
    @Prop({ default: '' }) readonly hash!: string;
}
</script>
<style lang="scss">
.top_bar {
  display: flex !important;
  justify-content: space-between !important;
  padding: 24px;
  margin-bottom: 16px;
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
  }
}
</style>

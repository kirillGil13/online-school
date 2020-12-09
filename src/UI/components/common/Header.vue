<template>
  <el-row :class="['top_bar', isBordered ? 'box-container' : '']">
    <el-col :span="16">
      <router-link v-if="route" :to="{name: route.name}">
        <svg-icon name="Arrow_Left" class="svg-fill-none mr-14"></svg-icon>
        {{route.label}}
      </router-link>
      <h1 v-if="title">{{title}}</h1>
      <span v-if="description">{{description}}</span>
    </el-col>
    <el-col :span="8">
      <slot></slot>
    </el-col>
  </el-row>
</template>
<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { HeaderRouteType } from "@/entity/common/header.types";

@Component
export default class Header extends Vue {
  @Prop({ default: "" }) readonly title!: string;
  @Prop({ default: "" }) readonly description!: string;
  @Prop({ default: "" }) readonly route!: HeaderRouteType;
  @Prop({ default: false }) readonly isBordered!: boolean;
}
</script>
<style lang="scss">
.top_bar {
  padding: 24px;
  margin-bottom: 16px;
  h1 {
    margin-bottom: 0;
    margin-top: 6px;
  }
  a {
    text-decoration: none;
    color: #426df6;
  }
}
span {
  color: #828282;
}
.box-container {
  background: #ffffff;
  border: 1px solid #f2f2f2;
  box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.04);
  border-radius: 12px;
}
</style>
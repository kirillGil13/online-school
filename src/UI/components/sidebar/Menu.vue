<template>
  <!-- мб рекурсию ёбнуть? я вроде не видел больше одной вложенности, поэтому так-->
  <el-submenu v-if="item.submenu" :index="index">
    <el-menu-item
        v-for="(subItem, subIndex) in item.submenu"
        :key="subItem.title"
        :index="subIndex"
        @click="$router.push({name: item.route})"
    >
      <span>{{ subItem.title }}</span>
    </el-menu-item>
  </el-submenu>
  <el-menu-item v-else :index="index" @click="$router.push({name: item.route})">
    <svg-icon :name="item.iconName"/>
    <span slot="title">{{ item.title }}</span>
  </el-menu-item>
</template>

<script lang="ts">
import {Component, Prop, Vue} from 'vue-property-decorator';
import {IMainMenu} from '@/entity/menu/menu.types';

@Component
export default class MenuComponent extends Vue {
  @Prop({required: true}) item!: IMainMenu;
  @Prop({required: true}) readonly index!: string;

  private resolvePath(path: string): void {
    this.$router.push(path);
  }
}
</script>
<style lang="scss" scoped>
.svg-icon {
  margin-right: 16px;
}
</style>

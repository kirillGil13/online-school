<template>
  <!-- мб рекурсию ёбнуть? я вроде не видел больше одной вложенности, поэтому так-->
<!--    <el-submenu v-if="item.submenu" :index="index">-->
<!--      <el-menu-item-->
<!--          v-for="(subItem, subIndex) in item.submenu"-->
<!--          :key="subItem.title"-->
<!--          :index="subIndex"-->
<!--          @click="$router.push({name: item.route})"-->
<!--      >-->
<!--        <span>{{ subItem.title }}</span>-->
<!--      </el-menu-item>-->
<!--    </el-submenu>-->
    <v-list-item :color="variables.menuActiveText" :index="index" @click="$router.push({name: item.route})">
      <v-list-item-icon>
        <svg-icon class="menu__icon" :name="item.iconName"/>
      </v-list-item-icon>
      <v-list-item-content>
        <span slot="title">{{ item.title }}</span>
      </v-list-item-content>
    </v-list-item>

</template>

<script lang="ts">
import {Component, Prop, Vue} from 'vue-property-decorator';
import {IMainMenu} from '@/entity/menu/menu.types';
import variables , {IScssVariables} from "@/UI/assets/scss/variables/_variables.scss";

@Component
export default class MenuComponent extends Vue {
  @Prop({required: true}) item!: IMainMenu;
  @Prop({required: true}) readonly index!: string;

  get variables(): IScssVariables {
    return variables;
  }
  private resolvePath(path: string): void {
    this.$router.push(path);
  }
}
</script>
<style lang="scss" scoped>
.menu__icon {
  margin-right: 16px;
}
</style>

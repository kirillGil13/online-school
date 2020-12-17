<template>
  <el-col>
    <div class="tabs">
      <ul>
        <li
          v-for="(tab, index) in tabsResponse"
          :key="index"
          :class="{ 'is-active': tab.isActive }"
        >
          <a :href="'#'+tab.id" @click="selectTab(tab.id)">{{ tab.title }}</a>
        </li>
      </ul>
    </div>

    <div class="tabs-details">
      <slot></slot>
    </div>
  </el-col>
</template>
<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { ITabs } from "@/entity/tabs/tabs.types";

@Component
export default class Tabs extends Vue {
  @Prop() readonly tabsResponse!: ITabs[];
  selectTab(id: string) {
    this.$emit("select", id);
  }
}
</script>
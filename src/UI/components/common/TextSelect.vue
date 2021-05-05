<template>
<div class="text-select-cont">
  {{activatorSelect}}
  <div class="text-select" @click="activatorSelect = true">
    <slot name="act"></slot>
    <v-list v-if="activatorSelect" class="list-items">
      <v-list-item v-for="(item, index) in selects" @click="select(item.id)" :key="index">{{item.name}}</v-list-item>
    </v-list>
  </div>
</div>
</template>

<script lang="ts">
import {Component, Prop, Vue} from 'vue-property-decorator';
import {ISelect} from '../../../entity/select/select.types';

@Component
export default class TextSelect extends Vue {
  @Prop() readonly selects!: ISelect[];
  activatorSelect = false;

  select(id: number): void {
    this.activatorSelect = false;
    console.log(this.activatorSelect);
    this.$emit('select', id);
  }
}
</script>

<style lang="scss" scoped>
.text-select-cont {
  position: relative;
  .text-select {
    position: relative;
    .list-items {
      position: absolute;
      top: 0;
      left: 0;
      z-index: 2;
    }
  }
}
</style>

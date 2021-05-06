<template>
<div class="text-select-cont">
  <div class="text-select d-flex justify-start">
    <div class="d-flex flex-row justify-end current" @click="open()">
      <v-icon color="primary" class="mr-2" size="16">mdi-chevron-down</v-icon>
      <div>
        {{ selects[0].name }}
      </div>
    </div>
    <div :class="['list-items', activator && 'active']">
      <template v-for="(item, index) in selects">
        <div class="text-right" v-show="activator" @click.stop="select(item.id)" :key="index">{{item.name}}</div>
      </template>
    </div>
  </div>
</div>
</template>

<script lang="ts">
import {Component, Prop, Vue} from 'vue-property-decorator';
import {ISelect} from '../../../entity/select/select.types';

@Component
export default class TextSelect extends Vue {
  @Prop() readonly selects!: ISelect[];
  activator = false;

  open(): void {
    this.activator = true;
  }

  select(id: number): void {
    this.activator = false;
    this.selects[0] = this.selects.splice(this.selects.indexOf(this.selects.find(item => item.id === id)!), 1, this.selects[0])[0];
    this.$emit('select', id);
  }
}
</script>

<style lang="scss" scoped>
.text-select-cont {
  position: relative;
  width: 140px;
  .text-select {
    width: 100%;
    position: relative;
    .current {
      padding: 0 10px;
      width: 100%;
    }
    .list-items {
      min-width: 140px;
      padding: 10px;
      border-radius: 6px;
      position: absolute;
      top: -10px;
      right: 0;
      z-index: 2;
      transition: all 0.5s ease;
      &.active {
        background-color: #fff;
        -webkit-box-shadow: 0 5px 24px rgb(0 0 0 / 8%);
        box-shadow: 0 5px 24px rgb(0 0 0 / 8%);
      }
    }
  }
}
</style>

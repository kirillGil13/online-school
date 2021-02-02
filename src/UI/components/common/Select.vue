<template>
  <v-menu
      origin="center center"
      transition="scale-transition"
  >
    <template v-slot:activator="{ attrs, on }">
      <div class="pos" v-bind="attrs"
           v-on="on">
        <slot name="act"/>
      </div>
    </template>
    <v-list>
      <v-list-item
          v-for="(item, index) in selects.items"
          :key="index"
          link
          @click="$emit('select', item.id)"
      >
        <v-list-item-icon v-if="item.icon">
          <svg-icon :name="item.iconName"></svg-icon>
        </v-list-item-icon>
        <v-list-item-title v-text="item.title"></v-list-item-title>
      </v-list-item>
    </v-list>
  </v-menu>
</template>
<script lang="ts">
import {Component, Prop, Vue} from 'vue-property-decorator';
import {ISelect} from '@/entity/select/select.types';

@Component
export default class Select extends Vue {
  @Prop() readonly selects!: ISelect;
}
</script>
<style lang="scss">
.v-list-item__icon {
  margin-right: 12px !important;
  .svg-icon {
    width: 22px !important;
    height: 22px !important;
  }
}
.v-list-item__title {
  font-size: 14px !important;
  color: #5F739C;
}
.pos {
  position: relative;
}
.v-menu__content {
  margin-top: 30px !important;
  border-radius: 12px !important;
}
</style>

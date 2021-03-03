<template>
  <v-menu
      origin="center center"
      transition="scale-transition"
      :content-class="className"
      class="selection"
  >
    <template v-slot:activator="{ attrs, on }">
      <div class="pos pr-0" v-bind="attrs"
           v-on="on">
        <slot name="act"/>
      </div>
    </template>
    <v-list>
      <v-list-item
          v-for="(item, index) in selects"
          :key="index"
          :id="`select${index}`"
          link
          class="selection"
          @click="item.extraAction ? $emit('extraAction', id) : $emit('select', {statusId: item.id, id: id})"
      >
        <v-list-item-icon v-if="item.photoLink">
          <v-img :src="item.photoLink" max-width="22" max-height="22"></v-img>
        </v-list-item-icon>
        <v-list-item-title v-text="item.name"></v-list-item-title>
      </v-list-item>
      <slot name="action"></slot>
    </v-list>
  </v-menu>
</template>
<script lang="ts">
import {Component, Prop, Vue} from 'vue-property-decorator';
import {ISelect} from '@/entity/select/select.types';

@Component
export default class Select extends Vue {
  @Prop() readonly selects!: ISelect[];
  @Prop() readonly className!: string;
  @Prop() readonly id!: number;
}
</script>
<style lang="scss">
.selection {
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
}
  .pos {
    position: relative;
  }
</style>

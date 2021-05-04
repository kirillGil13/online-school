<template>
  <v-menu
      origin="center center"
      transition="scale-transition"
      :content-class="className"
      auto
      :top="$adaptive.isMobile"
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
          dense
          link
          :ripple="!$adaptive.isMobile"
          class="selection pr-0"
          @click="item.extraAction ? $emit('extraAction', id, index) : $emit('select', {statusId: item.id, id: id})"
      >
        <v-list-item-icon v-if="item.photoLink">
          <v-img :src="item.photoLink" max-width="22" max-height="22"></v-img>
        </v-list-item-icon>
        <v-list-item-title v-text="item.name"></v-list-item-title>
        <v-menu
            :open-on-hover="!$adaptive.isMobile"
            v-if="item.description"
            top right
            offset-y
            offset-x
            :position-x="1000"
            :position-y="1000"
            content-class="pa-3 description-container"
            max-width="224"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-btn
                icon
                ripple
                v-bind="attrs"
                v-on="on"
                class="info-btn"
            >
              <v-icon color="grey lighten-1" size="16">
                mdi-information
              </v-icon>
            </v-btn>
          </template>
          <div class="status-desc">{{item.description}}</div>
        </v-menu>
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
  .info-btn {
    background-color: transparent !important;
    margin-top: 0;
    margin-left: 36px;
    padding: 0;
  }
}
  .pos {
    position: relative;
  }
  .description-container {
    background-color: #FFFFFF;
    border-radius: 8px !important;
    margin-top: -6px;
    margin-bottom: 20px;
    margin-left: -50px;
    color: #5A606F;
    font-size: 12px;
  }
</style>

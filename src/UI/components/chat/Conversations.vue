<template>
  <div class="pa-0 conversation d-flex flex-column ">
    <div class="conversation__item d-flex flex-row" v-for="index in 16" :key="index"
         :class="[index < 2 ? 'active' : '']">
      <v-avatar size="56" class="mr-3">
        <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTFnG0huY6whcqQtmgJDP7XgSb8VCpmLUnKXw&usqp=CAU"
            alt="">
      </v-avatar>
      <div class="conversation__content">
        <div class="conversation__header mb-1 d-flex justify-space-between align-center flex-row">
          <div class="name">Руслан Габидуллин</div>
          <div class="status">
            <svg-icon name="Delivered"></svg-icon>
            11:01
          </div>
        </div>
        Да, отлично, хорошая идея, когда вы
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';

@Component
export default class Conversations extends Vue {}
</script>

<style lang="scss">
.conversation {
  width: 327px !important;
  height: 100%;
  background: #FFFFFF;
  overflow: scroll;
  box-shadow: 2px 0px 2px rgba(0, 0, 0, 0.04);
  border-radius: 0px 0px 0px 12px;

  &__item {
    padding: 8px 12px 8px 16px;
    cursor: pointer;

    &.active {
      background: rgba(66, 109, 246, 0.12);
    }
  }

  &__content {
    width: 100%;
    color: #6D7885;
    font-size: 14px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  &__header {
    width: 100%;

    .name {
      font-size: 18px;
      color: #000000;
      font-weight: 600;
    }

    .status {
      font-size: 12px;
      color: #818C99;

      .svg-icon {
        width: 16px !important;
        height: 16px !important;
      }
    }
  }
}
</style>
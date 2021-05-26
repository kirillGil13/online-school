<template>
  <v-row class="chat-header" no-gutters>
    <Search/>
    <v-row class="header-actions d-flex justify-space-between align-center" no-gutters>
      <div class="user d-flex flex-row align-center">
        <v-avatar v-if="chosenPartner" size="32" class="mr-3 ml-4" :color="chosenPartner && chosenPartner.photoLink ? '#F0F2F6' :randomColor(chosenPartner && chosenPartner.id % 10)">
          <template v-slot:default v-if="chosenPartner.photoLink">
              <v-img :src="chosenPartner && chosenPartner.photoLink" alt="" />
          </template>
          <template v-else v-slot:default>
              <span style="color: #fff" class="font-weight-bold">{{(chosenPartner && chosenPartner.name[0] + chosenPartner &&  chosenPartner.name[0]).toUpperCase()}}</span>
          </template>
        </v-avatar>
        <div class="user__name">{{chosenPartner && chosenPartner.name + ' ' + chosenPartner.lastName}}</div>
      </div>
      <div class="actions d-flex flex-row justify-space-between">
      </div>
    </v-row>
  </v-row>
</template>

<script lang="ts">
import {Component, Prop, Vue} from 'vue-property-decorator';
import Search from '@/UI/components/common/Search.vue';
import { IDialogsAuthor } from '@/entity/dialogs/dialogs.types';
@Component({
  components: {Search}
})
export default class ChatHeader extends Vue {
  @Prop() readonly chosenPartner!: IDialogsAuthor;

  randomColor(i: number) {
    const COLORS = [
    '#56CCF2',
    '#BB6BD9',
    '#6FCF97',
    '#F2C94C',
    '#967CBA',
    '#FF9960',
    '#566FF2',
    '#FF5733',
    '#FF89C9',
    '#56F2DF',
    '#F38460',
    '#939ED6',
    '#F271A0',
    '#2ABF93',
    '#FF9C9C',
    '#6EC1F0',
    '#3B4244'
    ];
    return COLORS[i || 0];
  }
}
</script>

<style lang="scss">
.chat-header {
  box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.04);

  .search {
    width: 31%;
    background: none !important;
    border: none;

    .svg-icon {
      left: 20px;
    }

    input {
      width: 100%;
      border: none;
      border-top-left-radius: 12px;
      padding: 13px 0;
    }
  }

  .user {
    &__name {
      font-size: 16px;
    }
  }

  a {
    color: #5F739C;
    font-size: 14px;
    &.router-link-exact-active {
      background: rgba(66, 109, 246, 0.12);
      border-radius: 24px;
    }
    .actions {
      &__item {
        cursor: pointer;
        padding: 6px 16px;
      }
    }
  }
}
</style>
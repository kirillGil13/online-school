<template>
  <div class="pa-0 conversation d-flex flex-column " :style="{width: !$adaptive.isMobile ? '31%' : '100%',}">
    <div class="conversation__item d-flex flex-row"  @click="chosePartner(elem.account.id)" v-for="elem in dialogs" :key="elem.account.id"
         :class="[elem.account.id === chousenChatId ? 'active' : '']">
      <v-avatar size="56" class="mr-3" :color="elem && elem.account.photoLink ? '#F0F2F6' :randomColor(elem.account.id % 10)">
         <template v-slot:default v-if="elem && elem.account.photoLink">
              <v-img :src="elem && elem.account.photoLink" alt="" />
          </template>
          <template v-else v-slot:default>
              <span style="color: #fff" class="font-weight-bold">{{elem.account.name[0] + elem.account.lastName[0].toUpperCase()}}</span>
          </template>
      </v-avatar>
      <div class="conversation__content">
        <div class="conversation__header mb-1 d-flex justify-space-between align-center flex-row">
          <div class="name">{{elem.fullName}}</div>
          <div class="status" v-if="elem.countUnread === 0">
            <svg-icon name="Delivered"></svg-icon>
            {{elem.lastMessage.createdAt}}
          </div>
        </div>
        <span class="d-flex justify-space-between align-center flex-row">{{elem.lastMessage.text}} <span class="unReadDialog">{{elem.countUnread > 0 ? elem.countUnread : undefined}}</span></span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { IDialogs } from '@/entity/dialogs/dialogs.types';
import { DialogsStore } from '@/store/modules/Dialogs';
import {Component, Vue, Watch} from 'vue-property-decorator';

@Component
export default class Conversations extends Vue {

  chousenChatId: number | null = null;

  @Watch('$route.name')
  zeroChousenCahtId(): void {
    console.log(this.$route.name === this.$routeRules.ChatMain)

    
    if( this.$adaptive.isMobile  &&  this.$route.name === this.$routeRules.Chat && !this.$route.params.id) {
       this.chousenChatId = null;
    }
  }

  async created() {

    if(this.$route.name === this.$routeRules.ChatMain){
      this.chousenChatId = Number(this.$route.params.id)
    }

    await DialogsStore.fetchAll()

  }
  get dialogs(): IDialogs[] {
    return DialogsStore.dialogs;
  }

  chosePartner(id: number) {
    this.chousenChatId = id;

    this.$emit('chousePartnerId', id);
  }

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

.unReadDialog {
  background: #434DFF;
  padding: 0px 6px;
  color: #fff;
  border-radius: 12px;
}

.active {
  transform: rotate(0) !important;
}
.conversation {
  
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
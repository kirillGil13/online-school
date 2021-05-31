<template>
  <div class="pa-0 conversation d-flex flex-column " :style="{width: !$adaptive.isMobile ? '31%' : '100%',}">
    <div class="conversation__item d-flex flex-row"  @click="chosePartner(elem.account.id)" v-for="elem in dialogs" :key="elem.account.id"
         :class="[elem.account.id === chousenChatId ? 'active' : '']">
      <v-avatar @click="showLastMessage(elem)" size="56" class="mr-3" :color="elem && elem.account.photoLink ? '#F0F2F6' :randomColor(elem.account.id % 10)">
         <template v-slot:default v-if="elem && elem.account.photoLink">
              <v-img :src="elem && elem.account.photoLink" alt="" />
          </template>
          <template v-else v-slot:default>
              <span style="color: #fff;" class="font-weight-bold" >{{elem.account.name[0] + elem.account.lastName[0].toUpperCase()}}</span>
          </template>
      </v-avatar>
      <div class="conversation__content">
        <div class="conversation__header mb-1 d-flex justify-space-between align-center flex-row">
          <div class="name">{{elem.account.name + '.' + elem.account.lastName[0].toUpperCase()}}</div>
          <div class="status" >
            <template v-if="isReaded(elem.countUnread) === true">
              <svg width="14" height="8" viewBox="0 0 14 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9.68978 0.739633C9.89577 0.945624 9.91161 1.26976 9.73731 1.49392L9.68978 1.54776L3.97549 7.26204C3.7695 7.46803 3.44537 7.48388 3.2212 7.30958L3.16737 7.26204L0.881654 4.97633C0.658498 4.75317 0.658498 4.39136 0.881654 4.1682C1.08765 3.96221 1.41178 3.94637 1.63594 4.12067L1.68978 4.1682L3.57143 6.04941L8.88165 0.739633C9.10481 0.516476 9.46662 0.516476 9.68978 0.739633ZM13.1183 0.739633C13.3243 0.945624 13.3402 1.26976 13.1659 1.49392L13.1183 1.54776L7.40406 7.26204C7.1809 7.4852 6.8191 7.4852 6.59594 7.26204C6.38995 7.05605 6.3741 6.73192 6.5484 6.50775L6.59594 6.45392L12.3102 0.739633C12.5334 0.516476 12.8952 0.516476 13.1183 0.739633Z" fill="#434DFF"/>
              </svg>
            </template>
            <template v-else>
              <svg-icon name="Delivered"></svg-icon>
            </template>
            {{showDate(elem.lastMessage.createdAt)}}
          </div>
        </div>
        <span class="d-flex justify-space-between align-center flex-row" >{{ elem.lastMessage.text ? elem.lastMessage.text : 'Фото'}} <span class="unReadDialog">{{getUnReadMessage(elem.account.id)}}</span></span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { IDialogs } from '@/entity/dialogs/dialogs.types';
import { DialogsStore } from '@/store/modules/Dialogs';
import {Component, Vue, Watch} from 'vue-property-decorator';
import { WebSocketStore } from '@/store/modules/WebSocket';

@Component
export default class Conversations extends Vue {

  chousenChatId: number | null = null;

  @Watch('$route.params.id')
  zeroChousenChatId(): void {
    if( this.$adaptive.isMobile  &&  this.$route.name === this.$routeRules.Chat && !this.$route.params.id) {
       this.chousenChatId = null;
    }
    const unreadCount = this.dialogs.find(el => el.account.id.toString() === this.$route.params.id)?.countUnread;
    if(this.unReadMessages !== 0) {
      DialogsStore.setUnReadMessage({count: unreadCount!, operation: 'minus'})
    }

  }

  async created(): Promise<void> {
    if(this.$route.name === this.$routeRules.ChatMain){
      this.chousenChatId = Number(this.$route.params.id)
    }

    await DialogsStore.fetchAll()

  }
  get dialogs(): IDialogs[] {
    return DialogsStore.dialogs;
  }

  get unReadMessages(): number {
    return DialogsStore.unReadMessages;
  }

  get socket(): WebSocket | null {
    return WebSocketStore.socket;
  }

  showLastMessage(el: any): void {
    console.log( el)
  }


  chosePartner(id: number): void {
    this.chousenChatId = id;

    this.$emit('chousePartnerId', id);
  }

  showDate(currentDate: string): string {
    const date = new Date()
    const day = date.getDate();
    const month = date.getMonth() + 1 < 10 ?  `0${date.getMonth() + 1}` : date.getMonth() ;
    const today = `${day}.${month}`;
    const lastDate = currentDate.split(',')[0];
    const time = currentDate.split(',')[1];

    return today === lastDate ? time : currentDate;
  }


  isReaded(count: number): boolean {
    if(count === 0  || (this.$routeRules.ChatMain ===  this.$route.name) && this.$route.params.id === this.chousenChatId?.toString()) {
      return true
    }

    return false;
  }


  randomColor(i: number): string {
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

  beforeDestroy(): void {
    const el = {
        type:  'leave-dialog-type'
      }

    this.socket!.send(JSON.stringify(el))
  }

  getUnReadMessage(id: number): number | undefined {
    const elem = this.dialogs.find(el => el.account.id === id);

    if (elem!.countUnread !== 0) {
      if(this.$route.params.id !== elem?.account.id.toString()) {
        return elem!.countUnread;
      }
    }
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
      max-width: 150px;
      text-overflow: ellipsis;
      overflow: hidden;
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

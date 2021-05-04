<template>
  <div>
    <v-col class="chat pa-0">
      <ChatHeader :chosenPartner="($route.params.id && dialogsLoaded) && chosenPartner" v-if="!$adaptive.isMobile"/>
      <v-row class="chat-main d-flex flex-row" no-gutters>
        <Conversations :dialogs="dialogs" @chousePartnerId="chousePartnerId"/>
        <router-view v-if="$route.params.id && !$adaptive.isMobile"></router-view>
        <v-col v-if="!$route.params.id && !$adaptive.isMobile" class="d-flex align-center justify-center" style="font-size: 12px; color: #5F739C">Выберете диалог</v-col>
      </v-row>
    </v-col>

    <v-row justify="center"  v-if="$route.params.id && $adaptive.isMobile && chosenPartnerId">
    <v-dialog
      v-model="$adaptive.isMobile"
      scrollable
      fullscreen
      max-width="300px"
    >
      <v-card>
        <v-card-title class="d-flex justify-space-between">Чат <v-icon class="icon-close" color="#cccccc" style="background: none !important; margin: 0; padding: 0; color: #cccccc !important" @click="$router.push('/chat')">mdi-close</v-icon></v-card-title>
        <v-divider></v-divider>
        <v-card-text style="height: 300px;">
          <router-view v-if="$route.params.id && $adaptive.isMobile"></router-view>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <MessageSend  @sendMessage="sendMessage"/>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
  </div>
</template>

<script lang="ts">
import {Vue, Component, Watch} from 'vue-property-decorator';
import Conversations from '@/UI/components/chat/Conversations.vue';
import ChatHeader from '@/UI/components/chat/ChatHeader.vue';
import InDev from '../../components/common/banners/InDev.vue';
import { IDialogs, IDialogsAuthor } from '@/entity/dialogs/dialogs.types';
import { DialogsStore } from '@/store/modules/Dialogs';
import { RouterNameEnum } from '@/router/router.types';
import Modal from '@/UI/components/common/Modal.vue';
import MessageSend from '@/UI/components/message/MessageSend.vue';
import { WebSocketStore } from '@/store/modules/WebSocket';

@Component({
  components: {InDev, ChatHeader, Conversations, Modal, MessageSend }
})
export default class Chat extends Vue {
  chosenPartnerId: number | null = null;

  @Watch('$route.name')
  scrollTop() {
      if( this.$route.name === this.$routeRules.Chat) {
        window.scroll(0, 0)
      }
  }

  async created() {
    await DialogsStore.fetchAll()

  }
  get dialogs(): IDialogs[] {
    return DialogsStore.dialogs;
  }

  get dialogsLoaded(): boolean {
    return DialogsStore.dialogsLoaded;
  }

  get chosenPartner(): IDialogsAuthor | null  {

    if(this.$route.params.id){
      return this.dialogs.find(dialog => Number(dialog.account.id) === Number(this.$route.params.id) )!.account;
    }else {
      return null
    }
    
  }

  get socket(): WebSocket | null {
    return WebSocketStore.socket;
  }

  async findAccount(): Promise<IDialogsAuthor> {
    return this.dialogs.find(dialog => Number(dialog.account.id) === Number(this.$route.params.id) )!.account;
  }

  chousePartnerId(id: number): void {
    this.chosenPartnerId = id;
    this.$router.push({name: RouterNameEnum.ChatMain, params: {id: id.toString()}})
  }

  activatorChat(act: boolean) :void {

    if(act) {
      this.chosenPartnerId = Number(this.$route.params.id)
    }else {
      this.chosenPartnerId = null
    }

  }


  sendMessage(message: string): void {
    if(message.length === 0) {
      return
    }
    const el = {
      type: "send-message-service_type",
      data: {
        purposeAccountId: this.$route.params.id ,
        text: message.toString()

      }
    }
   
    this.socket!.send(JSON.stringify(el));
  }


}
</script>
<style lang="scss">
.chat {
  background: #FBFCFE;
  border: 1px solid rgba(66, 109, 246, 0.12);
  box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.04);
  border-radius: 12px;
  height: 862px;

  .chat-main {
    height: 100%;
    max-height: 812px;
    box-shadow: 2px 0px 2px rgba(0, 0, 0, 0.04);
    border-radius: 0px 0px 12px 12px;
    flex-wrap: nowrap;

  }
  .v-avatar {
    border: 0.5px solid rgba(0, 0, 0, 0.08);
  }
}

.icon-close {
  button {
    background-color: 0 !important;
    margin: 0;
    padding: 0;
  }
}
</style>

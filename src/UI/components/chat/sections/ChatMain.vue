<template>
  <div class="messages d-flex flex-column" id="messages" :style="{width: $adaptive.isMobile ? '100% !importnat' : '69%'}">
    <div class="message-container d-flex flex-column justify-end" :style="{padding: !$adaptive.isMobile ? '16px 11px 16px 11px' : '0'}">
      <div class="scrool-container" id="chatDialogContainer" ref="chatDialogContainer">
          <template  v-for="(message, idx) in messages" >
            <div class="date-container d-flex  flex-row align-center mt-2" v-if="idx === 0 || messages[idx].createdAt.split(',')[0] !== (idx === 0 ? messages[idx + 1].createdAt.split(',')[0] : messages[idx - 1].createdAt.split(',')[0])" :key="idx + Date.now()" >
              <v-divider style="background-color: rgba(66, 109, 246, 0.12);;"/>
              <div class="data-title-container mx-4">
                <span class="data-title" >{{messages[idx].createdAt.split(',')[0].split('.')[0] + ' ' + takeMonth(messages[idx].createdAt.split(',')[0].split('.')[1])}}</span> 
              </div>
              <v-divider style="background-color: rgba(66, 109, 246, 0.12);;"/>
            </div>
           
           <Message :date="message.createdAt.split(',')[1]" :body="message" :key="idx" :idx="idx" :friend="message.isMy ? false : true"/>
        </template>
        
      </div>
      
    </div>
    <MessageSend v-if="!$adaptive.isMobile"/>
    
  </div>
</template>

<script lang="ts">
import {Component, Vue, Watch} from 'vue-property-decorator';
import Notification from '@/UI/components/note/Notification.vue';
import Message from '@/UI/components/message/Message.vue';
import MessageSend from '@/UI/components/message/MessageSend.vue';
import { MessagesStore } from '@/store/modules/Messages';
import { WebSocketStore } from '@/store/modules/WebSocket';
import { IMessages } from '@/entity/messages/messages.types';
import { MONTHS } from '@/constants/month';
@Component({
  components: {MessageSend, Message, Notification}
})
export default class ChatMain extends Vue {

  @Watch('$route.params.id')
  async onChangeRoute(): Promise<void> {
    await this.fetchData();
    this.parentElement.scrollTop = this.parentElement.scrollHeight;

    const el = {
    type: "connect-to-dialog-type",
      data: {
        "purpose_account_id": this.$route.params.id
      }
    }

    this.socket!.send(JSON.stringify(el))
  }

  get socket(): WebSocket | null {
    return WebSocketStore.socket;
  }

  get messages(): IMessages[] {
    const photo = MessagesStore.messages.find(el => el.photoLink)
    return MessagesStore.messages
  }

  get parentElement(): HTMLElement {
    return (this.$refs.chatDialogContainer as HTMLElement)
  }

  async created(): Promise<void> {
    await this.fetchData();
    this.parentElement.scrollTop = this.parentElement.scrollHeight;

    const el = {
    type: "connect-to-dialog-type",
      data: {
        "purpose_account_id": this.$route.params.id
      }
    }

    this.socket!.send(JSON.stringify(el))
  }


  async fetchData(): Promise<void> {
    await  MessagesStore.fetchAll(this.$route.params.id.toString());
  }

  takeMonth(id: string): string {
    return MONTHS.find(el => id.includes(el.id.toString()))!.value;
  }
  
}
</script>

<style lang="scss"scoped >

.message-container {
  height: 100%;
  border: none !important;
  background-color: 0 !important;
}

.messages {
  max-height: 810px;
}

.scrool-container {
  overflow-y: auto;
  max-height: 99%;
}

.data-title {
  font-size: 12px;
  color: #5F739C;
}
</style>

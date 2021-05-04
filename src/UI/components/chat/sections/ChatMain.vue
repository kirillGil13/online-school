<template>
  <div class="messages d-flex flex-column" :style="{width: $adaptive.isMobile ? '100% !importnat' : '69%'}">
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
           
           <Message :date="message.createdAt.split(',')[1]" :body="message.text" :key="idx" :friend="message.isMy ? false : true"/>
        </template>
        
        
      </div>
      
    </div>
    <MessageSend v-if="!$adaptive.isMobile" @sendMessage="sendMessage"/>
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
import Messages from '@/entity/messages/messages';
import { MONTHS } from '@/constants/month';
@Component({
  components: {MessageSend, Message, Notification}
})
export default class ChatMain extends Vue {

  @Watch('$route.params.id')
  onChangeRoute(): void {
    this.fetchData();
    

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

  async created(): Promise<void> {
    this.fetchData();


    this.socket!.onmessage = async (event: any) => {

      const {data} = JSON.parse(event.data)
      
      this.messages.push(new Messages(data))
      const container =  await document.getElementById('chatDialogContainer');

      container!.scrollTop = await container!.scrollHeight
    }
  }

  get messages(): IMessages[] {
    return MessagesStore.messages
  }

  async fetchData(): Promise<void> {
    await  MessagesStore.fetchAll(this.$route.params.id.toString());
    const container =  await document.getElementById('chatDialogContainer');

    container!.scrollTop = await container!.scrollHeight
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
  overflow-y: scroll;
  overflow-x: hidden;
  height: 100%;
}

.data-title {
  font-size: 12px;
  color: #5F739C;
}
</style>

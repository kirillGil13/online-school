<template>
  <div class="messages d-flex flex-column" >
    <div class="message-container d-flex flex-column justify-end">
      <div class="scrool-container" id="chatDialogContainer" ref="chatDialogContainer">
        <Message :date="getTime(message.createdAt)" :body="message.text" v-for="message in messages" :key="message.id" :friend="message.isMy ? false : true"/>
      </div>
      
    </div>
    <MessageSend @sendMessage="sendMessage"/>
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
@Component({
  components: {MessageSend, Message, Notification}
})
export default class ChatMain extends Vue {

  @Watch('$route.params.id')
  onChangeRoute(): void {
    this.fetchData()
  }

  get socket(): WebSocket | null {
    return WebSocketStore.socket;
  }

  async created(): Promise<void> {
    this.fetchData()

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

  getTime(createdAt: number): string {
      const date = new Date(createdAt * 1000);
      return date.toLocaleString().slice(0,5) + date.toLocaleString().slice(10,17)
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
</style>

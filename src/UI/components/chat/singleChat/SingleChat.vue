<template>
  <div class="messages d-flex flex-column" id="messages">
    <div class="message-container d-flex flex-column justify-end" :style="{padding: !$adaptive.isMobile ? '16px 11px 16px 11px' : '10px'}">
      <Message :date="message.createdAt" :body="message" v-for="message in messages" :key="message.id" :friend="message.isMy ? false : true"/>
    </div>
  </div>
</template>

<script lang="ts">
import {Component, Vue,Prop} from 'vue-property-decorator';
import Notification from '@/UI/components/note/Notification.vue';
import Message from '@/UI/components/message/Message.vue';
import MessageSend from '@/UI/components/message/MessageSend.vue';
import {MessagesStore} from '../../../../store/modules/Messages';
import { IMessages } from '@/entity/messages/messages.types';
import {WebSocketStore} from '../../../../store/modules/WebSocket';
import { ICourseItem } from '@/entity/courseItem/courseItem.type';
@Component({
  components: {MessageSend, Message, Notification}
})
export default class SingleChat extends Vue {
  @Prop() readonly course!: ICourseItem;

  get socket(): WebSocket | null {
    return WebSocketStore.socket;
  }

  async created(): Promise<void> {
      await  MessagesStore.fetchAll(this.course.author.id.toString());
      const container =  document.getElementById('chatContainer');

      container!.scrollTop = container!.scrollHeight
  }

  get messages(): IMessages[] {
    return MessagesStore.messages
  }

  getTime(createdAt: number): string {
      const date = new Date(createdAt * 1000);
      return date.toLocaleString().slice(0,5) + date.toLocaleString().slice(10,17)
  }

  
}
</script>

<style lang="scss" scoped>

.messages {
    overflow: scroll;

    .message {
        border: none !important;
    }
}
</style>

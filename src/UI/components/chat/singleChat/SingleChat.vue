<template>
  <div class="messages d-flex flex-column">
    <div class="message-container d-flex flex-column justify-end">
      <Message date="17:10" body="Отлично! Вы молодец!"/>
      <Message date="17:10" body="Ok))" :friend="true"/>
    </div>
  </div>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';
import Notification from '@/UI/components/note/Notification.vue';
import Message from '@/UI/components/message/Message.vue';
import MessageSend from '@/UI/components/message/MessageSend.vue';
import {MessagesStore} from '../../../../store/modules/Messages';
import { IMessages } from '@/entity/messages/messages.types';
@Component({
  components: {MessageSend, Message, Notification}
})
export default class SingleChat extends Vue {

    async created(): Promise<void> {
        await  MessagesStore.fetchAll(this.$route.params.id);
    }

    get messages(): IMessages[] {
        return MessagesStore.messages
    }
}
</script>

<style lang="scss" scoped>

.messages {
    height: 100%;

    .message {
        border: none !important;
    }
}
</style>

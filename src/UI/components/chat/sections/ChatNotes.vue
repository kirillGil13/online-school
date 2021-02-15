<template>
  <div class="messages d-flex flex-column">
    <div class="message-container d-flex flex-column justify-end">
      <Notification date="17:06" title="Новый партнер!" desc="Руслан стал вашим партнером"/>
      <Notification date="17:06" title="Курс как повысить звезду от Ильгиза  •  Урок 1" desc="Руслан приступил к просмотру урока"/>
      <Notification date="17:06" title="Курс как повысить звезду от Ильгиза  •  Урок 1" desc="Руслан выполнил задание на 82%" :active="true"/>
    </div>
    <MessageSend/>
  </div>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';
import Notification from '@/UI/components/note/Notification.vue';
import MessageSend from '@/UI/components/message/MessageSend.vue';
@Component({
  components: {MessageSend, Notification}
})
export default class ChatNotes extends Vue {
}
</script>

<style lang="scss">
</style>

<template>
  <div>
    <v-col v-if="false" class="chat pa-0">
      <ChatHeader/>
      <v-row class="chat-main d-flex flex-row" no-gutters>
        <Conversations/>
        <router-view></router-view>
      </v-row>
    </v-col>
    <v-col v-else>
      <InDev/>
    </v-col>
  </div>
</template>

<script lang="ts">
import {Vue, Component} from 'vue-property-decorator';
import Conversations from '@/UI/components/chat/Conversations.vue';
import ChatHeader from '@/UI/components/chat/ChatHeader.vue';
import InDev from '../../components/common/banners/InDev.vue';

@Component({
  components: {InDev, ChatHeader, Conversations}
})
export default class Chat extends Vue {
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

  }
  .v-avatar {
    border: 0.5px solid rgba(0, 0, 0, 0.08);
  }
}
</style>

<template>
  <div>
    <v-col class="chat pa-0">
      <ChatHeader :chosenPartner="($route.params.id && dialogsLoaded) && chosenPartner"/>
      <v-row class="chat-main d-flex flex-row" no-gutters>
        <Conversations :dialogs="dialogs" @chousePartnerId="chousePartnerId"/>
        <router-view v-if="$route.params.id"></router-view>
      </v-row>
    </v-col>
  </div>
</template>

<script lang="ts">
import {Vue, Component} from 'vue-property-decorator';
import Conversations from '@/UI/components/chat/Conversations.vue';
import ChatHeader from '@/UI/components/chat/ChatHeader.vue';
import InDev from '../../components/common/banners/InDev.vue';
import { IDialogs, IDialogsAuthor } from '@/entity/dialogs/dialogs.types';
import { DialogsStore } from '@/store/modules/Dialogs';
import { RouterNameEnum } from '@/router/router.types';

@Component({
  components: {InDev, ChatHeader, Conversations}
})
export default class Chat extends Vue {
  chosenPartnerId: number | null = null;

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

  async findAccount(): Promise<IDialogsAuthor> {
    return this.dialogs.find(dialog => Number(dialog.account.id) === Number(this.$route.params.id) )!.account;
  }

  chousePartnerId(id: number): void {
    this.chosenPartnerId = id;
    this.$router.push({name: RouterNameEnum.ChatMain, params: {id: id.toString()}})
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

  }
  .v-avatar {
    border: 0.5px solid rgba(0, 0, 0, 0.08);
  }
}
</style>

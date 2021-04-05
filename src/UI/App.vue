<template>
  <v-app class="main-view">
    <v-main class="main-view__container">
      <router-view/>
    </v-main>
  </v-app>
</template>

<script lang="ts">
import {Component, Vue, Watch} from 'vue-property-decorator';
import {AuthStore} from '@/store/modules/Auth';
import {startIntercomMessenger} from '@/plugins';

@Component
export default class App extends Vue {

  // ws: WebSocket;
  // message = {
  //   type: 'send-message-service_type',
  //   data: {
  //     purposeAccountId: 20,
  //     text: 'hi',
  //   }
  // }
  @Watch('$vuetify.breakpoint.name')
  onBreakpointChange(): void {
    this.$adaptive.isMobile = this.resolveAdaptiveMobile();
  }

  async created(): Promise<void> {
    this.$adaptive.isMobile = this.resolveAdaptiveMobile();
    await AuthStore.load();
    // this.ws = new WebSocket(`${process.env.VUE_APP_WSS_URL}?token=` + localStorage.getItem('token'));
    // this.ws.onopen = function(): void {
    //   console.log('WS подключенно')
    // };
    // this.ws.onclose = function(eventclose: any): void {
    //   console.log('соеденение закрыто причина: ' + eventclose)
    // }
    // this.ws.onmessage = function(msg: any): void {
    //   console.log('Сообщение ' + msg)
    // }
    startIntercomMessenger(AuthStore.user);
  }

  // send(): void {
  //   this.ws.send(JSON.stringify(this.message));
  // }

  resolveAdaptiveMobile(): boolean {
    let isMobile = false;
    switch (this.$vuetify.breakpoint.name) {
      case 'xs': isMobile = true; break;
      case 'sm': isMobile = true; break;
      case 'md': isMobile = false; break;
    }
    return isMobile;
  }
}
</script>
<style lang="scss" scoped></style>

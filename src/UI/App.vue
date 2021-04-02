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

@Component
export default class App extends Vue {

  @Watch('$vuetify.breakpoint.name')
  onBreakpointChange(): void {
    this.$adaptive.isMobile = this.resolveAdaptiveMobile();
  }

  created(): void {
    this.$adaptive.isMobile = this.resolveAdaptiveMobile();
    AuthStore.load();
    const ws = new WebSocket(`${process.env.VUE_APP_WSS_URL}?token=` + localStorage.getItem('token'));
    ws.onopen = function(): void {
      console.log('WS подключенно')
    };
    ws.onclose = function(eventclose: any): void {
      console.log('соеденение закрыто причина: ' + eventclose)
    }
    ws.onmessage = function(msg: any): void {
      console.log('Сообщение ' + msg)
    }
  }

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

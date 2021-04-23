import VueNativeSock from 'vue-native-websocket'
import Vue from 'vue';
Vue.use(VueNativeSock, 'ws://localhost:9090', { protocol: 'my-protocol' })

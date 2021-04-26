import VueNativeSock from 'vue-native-websocket'
import Vue from 'vue';

const accessTokenObj = localStorage.getItem('token');

Vue.use(VueNativeSock, `${process.env.VUE_APP_WSS_URL}?token=${accessTokenObj}`, {
    format: 'json',
    reconnection: true,
    reconnectionAttempts: 5,
    reconnectionDelay: 3000,
})

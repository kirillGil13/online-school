import Vue from 'vue';

const accessTokenObj = localStorage.getItem('token');

/* eslint-disable */
/* tslint:disable */
const socket = new WebSocket(`${process.env.VUE_APP_WSS_URL}?token=${accessTokenObj}`);
const shared = new Vue({data: socket})
// @ts-ignore
shared.install = function(){
    Object.defineProperty(Vue.prototype, '$socket', {
        get () { return shared }
    })
}
// @ts-ignore
Vue.use(shared);
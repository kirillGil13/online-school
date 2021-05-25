import Vue from 'vue';

const accessTokenObj = localStorage.getItem('token');

Vue.prototype.$socket = new WebSocket(`${process.env.VUE_APP_WSS_URL}?token=${accessTokenObj}`);
/* eslint-disable */
/* tslint:disable */
// const foo = new Vue({data: {socket: null}})
// @ts-ignore
// foo.install = function(){
//     Object.defineProperty(Vue.prototype, '$socket', {
//         get () { return foo }
//     })
// }
// @ts-ignore
// Vue.use(foo);

/* eslint-disable */
/* tslint:disable */


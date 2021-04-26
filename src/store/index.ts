import Vue from 'vue';
import Vuex, { Store } from 'vuex';

Vue.use(Vuex);

export interface IState {
    v: '0.1';
    $socket: any;
}

export type IStore = Store<IState>;

const store = new Vuex.Store<IState>({});

export default store;

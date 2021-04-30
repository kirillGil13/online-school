import {getModule, Module, Mutation, VuexModule} from 'vuex-module-decorators';
import store from '@/store';

@Module({
    namespaced: true,
    name: 'adaptive',
    store,
    dynamic: true,
})
class WebSocketModule extends VuexModule {
    accessTokenObj = localStorage.getItem('token');
    socket: WebSocket | null = null;
    unreadCount: number = 0

    @Mutation
    setConnection(): void {
        this.socket = new WebSocket(`${process.env.VUE_APP_WSS_URL}?token=${this.accessTokenObj}`);
    }

    @Mutation
    plusUnreadCount() {
        this.unreadCount++;
    }


}

export const WebSocketStore = getModule(WebSocketModule);

/* eslint-disable @typescript-eslint/interface-name-prefix */
import Vue, { VueConstructor } from 'vue';

declare module 'vue/types/vue' {
    interface VueConstructor {
        $socket: WebSocket;
    }
}
declare module 'vue/types/vue' {
    interface Vue {
        $socket: WebSocket;
    }
}
declare module 'vue/types/options' {
    interface ComponentOptions<V extends Vue> {
        socket?: WebSocket;
    }
}

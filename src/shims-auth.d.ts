/* eslint-disable @typescript-eslint/interface-name-prefix */
import { IAuth } from '@/plugins/Auth/auth.types';

declare module 'vue/types/vue' {
    interface VueConstructor {
        auth: IAuth;
    }
}
declare module 'vue/types/vue' {
    interface Vue {
        auth: IAuth;
    }
}
declare module 'vue/types/vue' {
    interface ComponentOptions<V extends Vue> {
        auth: IAuth;
    }
}

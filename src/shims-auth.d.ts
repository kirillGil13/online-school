import {IAuth} from "@/store/modules/auth/auth.types";

declare module 'vue/types/vue' {
    interface VueConstructor {
        auth: IAuth
    }
}
declare module 'vue/types/vue' {
    interface Vue {
        auth: IAuth
    }
}
declare module 'vue/types/vue' {
    interface ComponentOptions<V extends Vue> {
        auth: IAuth
    }
}

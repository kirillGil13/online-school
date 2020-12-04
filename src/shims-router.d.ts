import {VueRouter} from "vue-router/types/router";
declare module 'vue/types/vue' {
    interface VueConstructor {
        router: VueRouter
    }
}
declare module 'vue/types/vue' {
    interface Vue {
        router: VueRouter
    }
}
declare module 'vue/types/vue' {
    interface ComponentOptions<V extends Vue> {
        router: VueRouter
    }
}

import Vue from "vue"
import Router from "vue-router"
import Login from "../UI/pages/Login.vue"


Vue.use(Router);

  const routes = [
        {
            path: '/', name: 'login', component: Login
        },
        {
            path: '/main', component: () => import("../UI/components/MainLayout.vue"), children: [
                { path: '', name: 'main', component: () => import("../UI/pages/MainPage.vue") },
                { path: '/training', name: 'training', component: () => import("../UI/pages/Training.vue") }
            ]
        }
    ]
Vue.router = new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})
export const router = Vue.router;
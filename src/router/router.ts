import Vue from "vue"
import Router from "vue-router"
import Login from "../UI/pages/Login.vue"


Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/', name: 'login', component: Login
        },
        {
            path: '/main', component: () => import("../UI/components/MainLayout.vue"), children: [
                { path: '', name: 'main', component: () => import("../UI/pages/MainPage.vue") }
            ]
        }
    ]
})
import Vue from 'vue';
import Router from 'vue-router';
import Login from '../UI/pages/Login.vue';

Vue.use(Router);

const routes = [
    {
        path: '/',
        name: 'login',
        component: Login,
    },
    {
        path: '/main',
        component: () => import('../UI/components/layouts/MainLayout.vue'),
        children: [
            {
                path: '',
                name: 'main',
                component: () => import('../UI/pages/MainPage.vue'),
            },
            {
                path: '/profile',
                name: 'profile',
                component: () => import('../UI/pages/Profile.vue'),
            },
            {
                path: '/training',
                name: 'training',
                component: () => import('../UI/pages/Training.vue'),
            },
            {
                path: '/training/:id',
                name: 'leaderCourses',
                component: () => import('../UI/pages/LeaderCoursePage.vue'),
            },
            {
                path: '/training/:id/:lessonId',
                name: 'course',
                component: () => import('../UI/pages/Course.vue'),
            },
            {
                path: '/candidates',
                name:'candidates',
                component: () => import('../UI/pages/Candidates.vue')
            }
        ],
    },
];
Vue.router = new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes,
});
export const router = Vue.router;

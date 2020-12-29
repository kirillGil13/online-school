/* eslint-disable @typescript-eslint/explicit-function-return-type */
import Vue from 'vue';
import Router from 'vue-router';
import Login from '../UI/pages/Login.vue';

Vue.use(Router);

const routes = [
    {
        path: '/auth/login',
        name: 'Login',
        component: Login,
        meta: { auth: false },
    },
    {
        path: '/',
        component: () => import('../UI/components/layouts/MainLayout.vue'),
        meta: { auth: true },
        children: [
            {
                path: '/',
                name: 'Main',
                component: () => import('../UI/pages/Profile.vue'),
            },
            {
                path: '/training',
                name: 'Training',
                component: () => import('../UI/pages/Training.vue'),
            },
            {
                path: '/training/:id',
                name: 'LeaderCourses',
                component: () => import('../UI/pages/LeaderCoursePage.vue'),
            },
            {
                path: '/training/:id/:lessonId',
                name: 'Course',
                component: () => import('../UI/pages/Course.vue'),
            },
            {
                path: '/candidates',
                name:'Candidates',
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

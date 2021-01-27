/* eslint-disable @typescript-eslint/explicit-function-return-type */
import Vue from 'vue';
import Router from 'vue-router';
import {RouterNameEnum} from '@/router/router.types';

Vue.use(Router);

const routes = [
    {
        path: '/auth/login',
        name: 'Login',
        component: () => import('../UI/pages/auth/Login.vue'),
        meta: { auth: false },
    },
    {
        path: '/',
        component: () => import('../UI/components/layouts/MainLayout.vue'),
        meta: { auth: true },
        children: [
            {
                path: '/main',
                name: 'Main',
                component: () => import('../UI/pages/profile/Profile.vue'),
            },
            {
                path: '/training',
                name: RouterNameEnum.Training,
                component: () => import('../UI/pages/training/Training.vue'),
            },
            {
                path: '/training/:id',
                name: RouterNameEnum.LeaderCourses,
                component: () => import('../UI/pages/leader/LeaderCoursePage.vue'),
            },
            {
                path: '/training/:id/:lessonId',
                name: RouterNameEnum.Course,
                component: () => import('../UI/pages/course/Course.vue'),
            },
            {
                path: '/candidates',
                name: RouterNameEnum.Candidates,
                component: () => import('../UI/pages/candidates/Candidates.vue'),
            },
            {
                path: '/partners',
                name: RouterNameEnum.Partners,
                component: () => import('../UI/pages/partners/Partners.vue'),
            },
            {
                path: '/calendar',
                name: RouterNameEnum.Calendar,
                component: () => import('../UI/pages/events/Events.vue'),
            },
            {
                path: '/chat',
                name: RouterNameEnum.Chat,
                component: () => import('../UI/pages/chat/Chat.vue'),
            },
            {
                path: '/materials',
                name: RouterNameEnum.Materials,
                component: () => import('../UI/pages/materials/Materials.vue'),
                redirect: '/materials/presentations',
                children: [
                    {
                        path: '/materials/presentations',
                        name: RouterNameEnum.MaterialPresentation,
                        component: () => import('../UI/pages/materials/Presentations.vue'),
                    },
                    {
                        path: '/materials/documents',
                        name: RouterNameEnum.MaterialDocuments,
                        component: () => import('../UI/pages/materials/Documents.vue'),
                    },
                    {
                        path: '/materials/infopacks',
                        name: RouterNameEnum.MaterialInfoPacks,
                        component: () => import('../UI/pages/materials/InfoPacks.vue'),
                    },
                ],
            },
        ],
    },
];
Vue.router = new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes,
});
export const router = Vue.router;

/* eslint-disable @typescript-eslint/explicit-function-return-type */
import Vue from 'vue';
import Router from 'vue-router';
import {RouterNameEnum} from '@/router/router.types';

Vue.use(Router);
Vue.prototype.$routeRules = RouterNameEnum;

const routes = [
    {
        path: '/auth',
        redirect: '/auth/login',
        component: () => import('../UI/layouts/AuthLayout.vue'),
        meta: { auth: false },
        children: [
            {
                path: 'login',
                name: RouterNameEnum.AuthLogin,
                component: () => import('@/UI/pages/auth/Login.vue'),
            },
            {
                path: 'signup',
                name: RouterNameEnum.AuthSignup,
                component: () => import('@/UI/pages/auth/Signup.vue'),
            },
        ],
    },
    {
        path: '/',
        component: () => import('../UI/layouts/MainLayout.vue'),
        meta: { auth: true },
        children: [
            {
                path: '/main',
                name: 'Main',
                component: () => import('../UI/pages/main/Main.vue'),
            },
            {
                path: '/leader/:id',
                name: RouterNameEnum.LeaderCourses,
                component: () => import('../UI/pages/leader/LeaderCoursePage.vue'),
            },
            {
                path: '/training',
                redirect: '/training/main',
                component: () => import('../UI/pages/training/Training.vue'),
                children: [
                    {
                        path: '/training/main',
                        name: RouterNameEnum.TrainingMain,
                        component: () => import('../UI/components/training/TrainingMain.vue')
                    },
                    {
                        path: '/training/courses',
                        name: RouterNameEnum.TrainingCourses,
                        component: () => import('../UI/components/training/TrainingCourses.vue')
                    },
                    {
                        path: '/training/leaders',
                        name: RouterNameEnum.TrainingLeaders,
                        component: () => import('../UI/components/training/TrainingLeaders.vue')
                    },
                    {
                        path: '/training/club',
                        name: RouterNameEnum.TrainingClub,
                        component: () => import('../UI/components/training/TrainingClub.vue')
                    }
                ]
            },
            {
                path: '/course/:id',
                name: RouterNameEnum.Course,
                component: () => import('../UI/pages/course/Course.vue'),
                children: [
                    {
                        path: ':lessonId',
                        name: RouterNameEnum.Lesson,
                        component: () => import('../UI/pages/course/Lesson.vue')
                    }
                ]
            },
            {
                path: '/candidates',
                name: RouterNameEnum.Candidates,
                component: () => import('../UI/pages/candidates/Candidates.vue'),

            },
            {
                path: '/candidates/statistics',
                name: RouterNameEnum.CandidatesStatistics,
                component: () => import('../UI/pages/candidates/CandidatesStatistics.vue')
            },
            {
                path: '/chat',
                component: () => import('../UI/pages/chat/Chat.vue'),
                children: [
                    {
                        path: '',
                        component: () => import('../UI/components/chat/sections/ChatMain.vue'),
                        name: RouterNameEnum.ChatMain
                    },
                    {
                        path: 'notes',
                        component: () => import('../UI/components/chat/sections/ChatNotes.vue'),
                        name: RouterNameEnum.ChatNotes
                    },
                    {
                        path: 'tasks',
                        component: () => import('../UI/components/chat/sections/ChatTasks.vue'),
                        name: RouterNameEnum.ChatTasks
                    },
                ]
            },
            {
                path: '/infoPackages',
                component: () => import('../UI/pages/infoPackages/InfoPackages.vue'),
                name: RouterNameEnum.InfoPackages
            },
            {
                path: '/chosen',
                component: () => import('../UI/pages/chosen/Chosen.vue'),
                name: RouterNameEnum.Chosen
            },

            {
                path: '/profile',
                component: () => import('../UI/pages/profile/Profile.vue'),
                name: RouterNameEnum.Profile
            }
        ],
    },
    {
        path: '/landing',
        component: () => import('../UI/layouts/LandingLayout.vue'),
        children: [
            {
                path: ':id',
                name: RouterNameEnum.Landing,
                component: () => import('@/UI/landing/Landing.vue'),
            },
        ],
    }
];

Vue.router = new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes,
});
export const router = Vue.router;

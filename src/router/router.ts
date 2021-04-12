/* eslint-disable @typescript-eslint/explicit-function-return-type */
import Vue from 'vue';
import Router from 'vue-router';
import {RouterNameEnum} from '@/router/router.types';
import {leaderGuard, mainGuard} from '@/guard';

Vue.use(Router);
Vue.prototype.$routeRules = RouterNameEnum;

const routes = [
    {
        path: '/auth',
        redirect: '/auth/login',
        component: () => import('../UI/layouts/AuthLayout.vue'),
        meta: {auth: false},
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
            {
                path: 'recover',
                name: RouterNameEnum.AuthRecover,
                component: () => import('@/UI/pages/auth/Recover.vue'),
            },
        ],
    },
    {
        path: '/',
        component: () => import('../UI/layouts/MainLayout.vue'),
        meta: {
            auth: true,
            new: true
        },
        beforeEnter: mainGuard,
        children: [
            {
                path: '',
                meta: {
                    title: 'Обучение - ONELINKS'
                },
                component: () => import('../UI/pages/training/Training.vue'),
                children: [
                    {
                        path: '',
                        name: RouterNameEnum.TrainingMain,
                        component: () => import('../UI/pages/training/TrainingMain.vue')
                    },
                    {
                        path: 'training/:hashtag',
                        name: RouterNameEnum.TrainingHashTag,
                        component: () => import('../UI/pages/training/TrainingMain.vue')
                    },
                ]
            },
            {
                path: 'main',
                name: RouterNameEnum.Main,
                meta: {
                    title: 'Главная - ONELINKS'
                },
                component: () => import('../UI/pages/main/Main.vue'),
            },
            {
                path: 'leader/:id',
                name: RouterNameEnum.LeaderCourses,
                component: () => import('../UI/pages/leader/LeaderPage.vue'),
            },

            {
                path: 'course/:id',
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
                path: 'candidates',
                meta: {
                    title: 'Кандидаты - ONELINKS'
                },
                name: RouterNameEnum.Candidates,
                component: () => import('../UI/pages/candidates/Candidates.vue'),

            },
            {
                path: 'candidates/statistics',
                meta: {
                    title: 'Кандидаты статистика - ONELINKS'
                },
                name: RouterNameEnum.CandidatesStatistics,
                component: () => import('../UI/pages/candidates/CandidatesStatistics.vue')
            },
            {
                path: 'my-studies',
                meta: {
                    title: 'Я изучаю - ONELINKS'
                },
                name: RouterNameEnum.MyStudies,
                component: () => import('../UI/pages/myStudies/MyStudies.vue')
            },
            {
                path: 'chat',
                meta: {
                    title: 'Чат - ONELINKS'
                },
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
                path: 'infoPackages',
                meta: {
                    title: 'Инфопакеты - ONELINKS'
                },
                component: () => import('../UI/pages/infoPackages/InfoPackages.vue'),
                name: RouterNameEnum.InfoPackages
            },
            {
                path: 'chosen',
                meta: {
                    title: 'Избранное - ONELINKS'
                },
                component: () => import('../UI/pages/chosen/Chosen.vue'),
                name: RouterNameEnum.Chosen
            },
            {
                path: 'leaders/:id',
                meta: {
                    title: 'Лидеры - ONELINKS'
                },
                component: () => import('../UI/pages/leader/LeaderPage.vue'),
                name: RouterNameEnum.LeaderPage
            },
            {
                path: 'profile',
                component: () => import('../UI/pages/profile/Profile.vue'),
                name: RouterNameEnum.Profile
            },
            {
                path: 'cabinet',
                component: () => import('../UI/pages/cabinet/Cabinet.vue'),
                name: RouterNameEnum.Cabinet,
                meta: {
                    isLeader: true,
                    title: 'Кабинет лидера - ONELINKS'
                },
                beforeEnter: leaderGuard
            },
            {
                path: 'confirm/:type',
                meta: {
                    confirm: true
                },
                component: () => import('../UI/pages/confirm/ConfirmPage.vue'),
                name: RouterNameEnum.Confirm
            },

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

router.beforeEach((to, from, next) => {
    const nearestWithTitle = to.matched.slice().reverse().find(r => r.meta && r.meta.title);
    const nearestWithMeta = to.matched.slice().reverse().find(r => r.meta && r.meta.metaTags);
    if (nearestWithTitle) {
        document.title = nearestWithTitle.meta.title;
    }
    Array.from(document.querySelectorAll('[data-vue-router-controlled]')).map(el => el.parentNode?.removeChild(el));
    if (!nearestWithMeta) {
        return next();
    }
    nearestWithMeta.meta.metaTags.map((tagDef: any) => {
        const tag = document.createElement('meta');
        Object.keys(tagDef).forEach(key => {
            tag.setAttribute(key, tagDef[key]);
        });
        tag.setAttribute('data-vue-router-controlled', '');
        return tag;
    })
        .forEach((tag: any) => document.head.appendChild(tag));
    next();
});

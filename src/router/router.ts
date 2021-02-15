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
        meta: {auth: false},
    },
    {
        path: '/',
        component: () => import('../UI/components/layouts/MainLayout.vue'),
        meta: {auth: true},
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
                path: '/organization',
                component: () => import('../UI/pages/orgDetail/OrganizationDetail.vue'),
                children: [
                    {
                        path: '',
                        name: RouterNameEnum.OrganizationMain,
                        component: () => import('../UI/components/orgDetail/OrganizationMain.vue')
                    },
                    {
                        path: 'training',
                        name: RouterNameEnum.OrganizationTraining,
                        component: () => import('../UI/components/orgDetail/OrganizationTraining.vue')
                    },
                    {
                        path: 'presentations',
                        name: RouterNameEnum.OrganizationPresentations,
                        component: () => import('../UI/components/orgDetail/OrganizationPresentations.vue')
                    },
                    {
                        path: 'info-packages',
                        name: RouterNameEnum.OrganizationInfoPackages,
                        component: () => import('../UI/components/orgDetail/OrganizationInfoPackages.vue')
                    },
                    {
                        path: 'documents',
                        name: RouterNameEnum.OrganizationDocuments,
                        component: () => import('../UI/components/orgDetail/OrganizationDocuments.vue')
                    },
                    {
                        path: 'instructions',
                        name: RouterNameEnum.OrganizationInstructions,
                        component: () => import('../UI/components/orgDetail/OrganizationInstructions.vue')
                    },
                    {
                        path: 'leaders',
                        name: RouterNameEnum.OrganizationLeaders,
                        component: () => import('../UI/components/orgDetail/OrganizationLeaders.vue')
                    },
                    {
                        path: 'group',
                        name: RouterNameEnum.OrganizationGroup,
                        component: () => import('../UI/components/orgDetail/OrganizationGroup.vue')
                    },

                ]
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
                path: '/partners',
                name: RouterNameEnum.Partners,
                component: () => import('../UI/pages/partners/Partners.vue'),
                children: [
                    {
                        path: ':id',
                        name: RouterNameEnum.PartnerPage,
                        component: () => import('../UI/pages/partners/PartnerPage.vue')
                    }
                ]
            },
            {
                path: '/calendar',
                name: RouterNameEnum.Calendar,
                component: () => import('../UI/pages/events/Events.vue'),
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
                path: '/profile',
                component: () => import('../UI/pages/profile/Profile.vue'),
                name: RouterNameEnum.Profile
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

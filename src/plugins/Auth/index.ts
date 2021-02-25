/* eslint-disable @typescript-eslint/ban-ts-ignore */
import Vue from 'vue';

//@ts-ignore
import auth from '@websanova/vue-auth/src';
//@ts-ignore
import authBearer from './bearer';
//@ts-ignore
import axios from '@websanova/vue-auth/drivers/http/axios.1.x';
//@ts-ignore
import router from '@websanova/vue-auth/drivers/router/vue-router.2.x';
import { RouterNameEnum } from '@/router/router.types';

Vue.use(auth, {
    auth: authBearer,
    http: axios,
    router: router,
    rolesKey: 'type',
    tokenDefaultKey: 'token',

    // Redirects
    authRedirect: { name: RouterNameEnum.AuthLogin },
    forbiddenRedirect: { path: '/403' },
    notFoundRedirect: { path: '/404' },
    // Http
    loginData: {
        url: '/accounts/auth/base',
        method: 'POST',
        redirect: '/',
    },
    registerData: {
        url: '/accounts/register',
        method: 'POST',
        redirect: '/'
    },
    refreshData: {
        url: '/accounts/me',
        method: 'GET',
        enabled: false,
        interval: 10,
    },
    fetchData: {
        url: '/accounts/me',
        enabled: true,
    },

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    parseUserData: (data: Array<any>) => data,
});

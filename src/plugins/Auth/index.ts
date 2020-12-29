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

Vue.use(auth, {
    auth: authBearer,
    http: axios,
    router: router,
    rolesKey: 'type',
    tokenDefaultKey: 'token',

    // Redirects
    authRedirect: { name: 'Login' },
    forbiddenRedirect: { path: '/403' },
    notFoundRedirect: { path: '/404' },
    // Http
    registerData: {
        url: 'users/register',
        method: 'POST',
        redirect: '/',
        autoLogin: true,
    },
    loginData: {
        url: 'users/login',
        method: 'POST',
        redirect: '/',
    },
    refreshData: {
        url: 'users/token/refresh',
        method: 'POST',
        enabled: false,
        interval: 10,
    },
    fetchData: {
        url: 'users/info',
        enabled: true,
    },

    parseUserData: (data: Array<any>) => data,
});

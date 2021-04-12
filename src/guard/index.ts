import {AuthStore} from '@/store/modules/Auth';
import {RouterNameEnum} from '@/router/router.types';
import {TourStore} from '@/store/modules/Tour';

export const leaderGuard = (to: any, from: any, next: any): any => {
    const isLeader = AuthStore.user!.isLeader;
    if (to.matched.some((route: any) => route.meta?.isLeader)) {
        if (isLeader) {
            return next();
        } else {
            return next('/');
        }
    } else {
        return next();
    }
};

export const mainGuard = (to: any, from: any, next: any): any => {
    if (to.matched.some((route: any) => route.meta?.new) && from.name === RouterNameEnum.AuthSignup) {
        TourStore.setNewUser();
        return next();
    } else return next();
};

export const confirmGuard = (to: any, from: any, next: any): any => {
    const isEmailConfirmed = AuthStore.user!.isEmailConfirmed;
    if (to.matched.some((route: any) => route.meta?.confirm)) {
        if (isEmailConfirmed) {
            return next('/');
        } else {
            return next();
        }
    } else return next();
};



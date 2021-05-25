import {AuthStore} from '@/store/modules/Auth';

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

export const landingGuard = (to: any, from: any, next: any): any => {
    if (AuthStore.user) {
        const isSubActive = AuthStore.user!.subscription.isActual;
        if (isSubActive) {
            return next();
        } else return next('/404');
    } else return next();
};




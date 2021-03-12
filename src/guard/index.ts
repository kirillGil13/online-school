import {AuthStore} from '@/store/modules/Auth';
import {RouterNameEnum} from '@/router/router.types';

export const leaderGuard = (to: any, from: any, next: any): any => {
    const isLeader = AuthStore.user.isLeader;
    if (to.matched.some((route: any) => route.meta?.isLeader)) {
        if (isLeader) {
            return next();
        } else {
            return next({name: RouterNameEnum.Main});
        }
    } else {
        return next();
    }
};

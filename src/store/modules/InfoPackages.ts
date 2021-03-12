import {Module, getModule, VuexModule, MutationAction} from 'vuex-module-decorators';
import store from '@/store';
import {IInfoPackage} from '@/entity/infoPackages/infoPackage.types';
import {IInfoPackageItem} from '@/entity/infoPackageItem/infoPackageItem.types';

@Module({
    namespaced: true,
    name: 'infoPackages',
    store,
    dynamic: true,
})
class InfoPackagesModule extends VuexModule {
    infoPackages: IInfoPackage[] = [];
    infoPackageItem: IInfoPackageItem | null = null;
    infoPackageItemLoaded = false;
    infoPackagesLoaded = false;

    @MutationAction
    async fetchAll(): Promise<{ infoPackages: IInfoPackage[]; infoPackagesLoaded: boolean}> {
        const infoPackages = await store.$repository.infoPackages.fetchAll();
        let infoPackagesLoaded = false;
        if (infoPackages.length !== 0) {
            infoPackagesLoaded = true;
        }
        return {infoPackages, infoPackagesLoaded};
    }
    @MutationAction
    async fetchData(data: {route: string; accountId: string}): Promise<{ infoPackageItem: IInfoPackageItem; infoPackageItemLoaded: boolean}> {
        const infoPackageItem = await store.$repository.infoPackages.fetchData(data.route, {account_id: data.accountId});//eslint-disable-line
        let infoPackageItemLoaded = false;
        if (infoPackageItem !== null) {
            infoPackageItemLoaded = true;
        }
        return {infoPackageItem, infoPackageItemLoaded};
    }
}

export const InfoPackagesStore = getModule(InfoPackagesModule)
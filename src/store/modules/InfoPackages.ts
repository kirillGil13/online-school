import {Module, getModule, VuexModule, MutationAction} from 'vuex-module-decorators';
import store from '@/store';
import {IInfoPackage} from '@/entity/infoPackages/infoPackage.types';

@Module({
    namespaced: true,
    name: 'infoPackages',
    store,
    dynamic: true,
})
class InfoPackagesModule extends VuexModule {
    infoPackages: IInfoPackage[] = [];
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
}

export const InfoPackagesStore = getModule(InfoPackagesModule)
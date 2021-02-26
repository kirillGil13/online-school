import { getModule, Module, MutationAction, VuexModule} from 'vuex-module-decorators';
import store from '@/store';
import {IStatusIcons} from '@/entity/statusIcons/statusIcons.types';

@Module({
    namespaced: true,
    name: 'statusIcons',
    store,
    dynamic: true,
})
class StatusIconsModule extends VuexModule {
    statusIcons: IStatusIcons[] = [];
    statusIconsLoaded = false;

    @MutationAction
    async fetchAll(): Promise<{ statusIcons: IStatusIcons[]; statusIconsLoaded: boolean }> {
        const statusIcons = await store.$repository.statusIcons.fetchAll();
        let statusIconsLoaded = false;
        if (statusIcons.length !== 0) {
            statusIconsLoaded = true;
        }
        return { statusIcons, statusIconsLoaded };
    }
}

export const StatusIconsStore = getModule(StatusIconsModule);
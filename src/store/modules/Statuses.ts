import {Action, getModule, Module, MutationAction, VuexModule} from 'vuex-module-decorators';
import store from '@/store';
import {IStatuses} from '@/entity/statuses/statuses.types';
import {StatusFormRequestType} from '@/form/status/statusForm.types';

@Module({
    namespaced: true,
    name: 'statuses',
    store,
    dynamic: true,
})
class StatusesModule extends VuexModule {
    statuses: IStatuses[] = [];
    statusesLoaded = false;

    @MutationAction
    async fetchAll(): Promise<{ statuses: IStatuses[]; statusesLoaded: boolean }> {
        const statuses = await store.$repository.statuses.fetchAll();
        let statusesLoaded = false;
        if (statuses.length !== 0) {
            statusesLoaded = true;
        }
        return { statuses, statusesLoaded };
    }

    @Action
    async create(data: StatusFormRequestType): Promise<IStatuses> {
        const response = await store.$repository.statuses.create(data);
        return response;
    }

}

export const StatusesStore = getModule(StatusesModule);
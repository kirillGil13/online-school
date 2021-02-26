import {Action, getModule, Module, MutationAction, VuexModule} from 'vuex-module-decorators';
import store from '@/store';
import {IStatuses, StatusesRequestType} from '@/entity/statuses/statuses.types';
import {StatusFormRequestType} from '@/form/status/statusForm.types';
import {ICandidate} from '@/entity/candidates';

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

    @Action({rawError: true})
    async create(data: StatusFormRequestType): Promise<IStatuses> {
        const response = await store.$repository.statuses.create(data);
        return response;
    }

    @Action({rawError: true})
    async set(data: {status: StatusesRequestType; candidateId: string}): Promise<ICandidate> {
        const response = await store.$repository.statuses.set(data.status, data.candidateId);
        return response;
    }
}

export const StatusesStore = getModule(StatusesModule);
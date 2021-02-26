import {Action, getModule, Module, MutationAction, VuexModule} from 'vuex-module-decorators';
import store from '@/store';
import {ICandidateItem} from '@/entity/candidateItem/candidateItem.types';
import {UpdateCandidateFormRequestType} from '@/form/updateCandidate/updateCandiadteForm.types';

@Module({
    namespaced: true,
    name: 'candidateItem',
    store,
    dynamic: true,
})
class CandidateItemModule extends VuexModule {
    candidateItem: ICandidateItem | null = null;

    @MutationAction
    async fetchData(candidateId: string): Promise<{ candidateItem: ICandidateItem }> {
        const candidateItem = await store.$repository.candidateItem.fetchData(candidateId);
        return { candidateItem };
    }

    @Action({rawError: true})
    async update(data: {data: UpdateCandidateFormRequestType; route: string}): Promise<ICandidateItem> {
        const response = await store.$repository.candidateItem.update(data.data, data.route);
        return response;
    }
}

export const CandidateItemStore = getModule(CandidateItemModule);

import {Action, getModule, Module, MutationAction, VuexModule} from 'vuex-module-decorators';
import store from '@/store';
import { ICandidate } from '@/entity/candidates';
import {CandidateFormRequestType} from '@/form/candidate/candidateForm.types';

@Module({
    namespaced: true,
    name: 'candidates',
    store,
    dynamic: true,
})
class CandidatesModule extends VuexModule {
    candidates: ICandidate[] = [];

    @MutationAction
    async fetchAll(): Promise<{ candidates: ICandidate[] }> {
        const candidates = await store.$repository.candidates.fetchAll();
        return { candidates };
    }

    @Action
    async create(data: CandidateFormRequestType): Promise<boolean> {
        const response = await store.$repository.candidates.create(data);
        return response;
    }
}

export const CandidatesStore = getModule(CandidatesModule);

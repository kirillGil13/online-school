import { getModule, Module, MutationAction, VuexModule } from 'vuex-module-decorators';
import store from '@/store';
import { ICandidate } from '@/entity/candidates';

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
}

export const CandidatesStore = getModule(CandidatesModule);

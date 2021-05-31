import {Action, getModule, Module, Mutation, MutationAction, VuexModule} from 'vuex-module-decorators';
import store from '@/store';
import {ICandidate} from '@/entity/candidates';
import {CandidateFormRequestType, CandidatePhoneRequestType, CandidateStatusCount} from '@/form/candidate/candidateForm.types';
import {CodeRequestType} from '@/form/code/codeForm.types';
import {PaginationRequestType} from '@/entity/common/pagination.types';

@Module({
    namespaced: true,
    name: 'candidates',
    store,
    dynamic: true,
})
class CandidatesModule extends VuexModule {
    candidates: {[params: string]: ICandidate[]}= {};
    candidatesLoaded = false;
    candidateArchiveCount = 0;


    @Mutation
    setCandidates(data: {candidates: {[params: string]: ICandidate[]}; candidatesLoaded: boolean; scroll: boolean}): void {
        if (!data.scroll) {
            this.candidates = data.candidates;
        } else {
            const candidatesData = [...Object.values(this.candidates), ...Object.values(data.candidates)].flat();
            const candidateTodate: {[params: string]: ICandidate[]} =  {};

            candidatesData.forEach(el => {
                const data = el.createdAt.split(',')[0];

                if(!candidateTodate[data]) {
                    candidateTodate[data] = [...candidatesData.filter(el => el.createdAt.split(',')[0] === data)];
                }
            })
        }
        this.candidatesLoaded = data.candidatesLoaded;
    }

    @Action({commit: 'setCandidates', rawError: true})
    async fetchAll(data?: {data?: PaginationRequestType; scroll?: boolean}): Promise<{ candidates: {[params: string]: ICandidate[]}; candidatesLoaded: boolean; scroll: boolean }> {
        const formData = new FormData();
        let candidatesLoaded = false;
        let scroll = false;
        if (data && data.data) {
            if (data.scroll) {
                scroll = data.scroll;
            }
            if (data.data.statusId) {
                formData.append('statusId', data.data.statusId.toString());
            } else formData.delete('statusId');
            if (data.data.infoPackId) {
                formData.append('infoPackId', data.data.infoPackId.toString());
            } else formData.delete('infoPackId');
            if (data.data.isFiction !== undefined) {
                formData.append('isFiction', data.data.isFiction.toString());
            } else formData.delete('isFiction');
            if (data.data.limit) {
                formData.append('limit', data.data.limit.toString());
            } else formData.delete('limit');
            if (data.data.search) {
                formData.append('search', data.data.search);
            } else formData.delete('search');
            if (data.data.skip) {
                formData.append('skip', data.data.skip.toString());
            } else formData.delete('skip');
        }
        const candidates = await store.$repository.candidates.fetchAll(formData);
        if (candidates) {
            candidatesLoaded = true;
        }
        return {candidates, candidatesLoaded, scroll};
    }

    @Action({rawError: true})
    async create(data: CandidateFormRequestType): Promise<boolean> {
        const response = await store.$repository.candidates.create(data);
        return response;
    }

    @Action({rawError: true})
    async sendCode(data: CandidatePhoneRequestType): Promise<boolean> {
        const response = await store.$repository.candidates.sendCode(data);
        return response;
    }

    @Action({rawError: true})
    async checkCode(data: CodeRequestType): Promise<boolean> {
        const response = await store.$repository.candidates.checkCode(data);
        return response;
    }

    @MutationAction
    async takeCountStatusCandidates(data: CandidateStatusCount): Promise<{candidateArchiveCount: number}> {
        const candidateArchiveCount  = await store.$repository.candidates.takeCountStatus(data);
        return {candidateArchiveCount}
    }

    @Action({rawError: true})
    async delete(route: string): Promise<boolean> {
        const response = await store.$repository.candidates.delete(route);
        return response;
    }
}

export const CandidatesStore = getModule(CandidatesModule);

import {Action, getModule, Module, MutationAction, VuexModule} from 'vuex-module-decorators';
import store from '@/store';
import {CandidateRequestType, ICandidate} from '@/entity/candidates';
import {CandidateFormRequestType} from '@/form/candidate/candidateForm.types';
import {PhoneRequestType} from '@/form/phone/phoneForm.types';
import {CodeRequestType} from '@/form/code/codeForm.types';

@Module({
    namespaced: true,
    name: 'candidates',
    store,
    dynamic: true,
})
class CandidatesModule extends VuexModule {
    candidates: ICandidate[] = [];
    candidatesLoaded = false;

    @MutationAction
    async fetchAll(data?: CandidateRequestType): Promise<{ candidates: ICandidate[]; candidatesLoaded: boolean }> {
        const formData = new FormData();
        let candidatesLoaded = false;
        if(data) {
            if (data.statusId) {
                formData.append('statusId', data.statusId.toString());
            }
            else formData.delete('statusId');
            if (data.infoPackId) {
                formData.append('infoPackId', data.infoPackId.toString());
            }
            else formData.delete('infoPackId');
            if (data.isFiction !== undefined) {
                formData.append('isFiction', data.isFiction.toString());
            }
            else formData.delete('isFiction');
            if (data.limit) {
                formData.append('limit', data.limit.toString());
            }
            else formData.delete('limit');
            if (data.search) {
                formData.append('search', data.search);
            }
            else formData.delete('search');
            if (data.skip) {
                formData.append('skip', data.skip.toString());
            }
            else formData.delete('skip');
        }
        const candidates = await store.$repository.candidates.fetchAll(formData);
        if (candidates) {
            candidatesLoaded = true;
        }
        return { candidates, candidatesLoaded };
    }

    @Action({rawError: true})
    async create(data: CandidateFormRequestType): Promise<boolean> {
        const response = await store.$repository.candidates.create(data);
        return response;
    }

    @Action({rawError: true})
    async sendCode(data: PhoneRequestType): Promise<boolean> {
        const response = await store.$repository.candidates.sendCode(data);
        return response;
    }

    @Action({rawError: true})
    async checkCode(data: CodeRequestType): Promise<boolean> {
        const response = await store.$repository.candidates.checkCode(data);
        return response;
    }
}

export const CandidatesStore = getModule(CandidatesModule);

import Api from '@/repository/api';
import { ICandidatesRepository } from '@/repository/candidates';
import {Candidate, CandidateResponseType, ICandidate} from '@/entity/candidates';
import {CandidateFormRequestType} from '@/form/candidate/candidateForm.types';
import {PhoneRequestType} from '@/form/phone/phoneForm.types';
import {CodeRequestType} from '@/form/code/codeForm.types';

export class CandidatesRepository implements ICandidatesRepository {
    async fetchAll(data?: FormData): Promise<ICandidate[]> {
        const response = await Api.get('/candidates', {params: data, paramsSerializer: function paramsSerializer(params) {
                return new URLSearchParams(params).toString()
            }});
        const respData = response.data as CandidateResponseType[];
        return respData.map((candidate: CandidateResponseType) => new Candidate(candidate));
    }
    async create(data: CandidateFormRequestType): Promise<boolean> {
        const response = await Api.post('/candidates', data);
        const respData = response.data;
        return respData.result;
    }
    async sendCode(data: PhoneRequestType): Promise<boolean> {
        const response = await Api.post('/candidates/confirmPhone/send', data);
        const respData = response.data;
        return respData.result;
    }
    async checkCode(data: CodeRequestType): Promise<boolean> {
        const response = await Api.post('/candidates/confirmPhone/do', data);
        const respData = response.data;
        return respData.result;
    }
}

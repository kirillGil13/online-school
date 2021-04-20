import Api from '@/repository/api';
import { ICandidatesRepository } from '@/repository/candidates';
import {Candidate, CandidateResponseType, CandidateStatusResponseType, ICandidate} from '@/entity/candidates';
import {CandidateFormRequestType, CandidateStatusCount} from '@/form/candidate/candidateForm.types';
import {PhoneRequestType} from '@/form/phone/phoneForm.types';
import {CodeRequestType} from '@/form/code/codeForm.types';
import { CandidateItem } from '@/entity/candidateItem/candidateItem';

export class CandidatesRepository implements ICandidatesRepository {
    async fetchAll(data?: FormData): Promise<ICandidate[]> {
        const response = await Api.get('/candidates', {params: data, paramsSerializer: function paramsSerializer(params) {
                return new URLSearchParams(params).toString()
            }});
        const respData = response.data as CandidateResponseType[];

        const candidateTodate =  {};
        const candidates = respData.map((candidate: CandidateResponseType) => new Candidate(candidate));
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

    async takeCountStatus(data: CandidateStatusCount): Promise<number> {
        const responce = await Api.get(`/candidates/${data.status}/count`);
        const respData = responce.data;
        return respData;
    }

    getTime(createdAt: number): string {
        const date = new Date(createdAt * 1000)
        return date.toLocaleString().slice(0,5) + date.toLocaleString().slice(10,17)
    }
}

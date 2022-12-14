import { ICandidate} from '@/entity/candidates';
import {CandidateFormRequestType, CandidatePhoneRequestType,CandidateStatusCount} from '@/form/candidate/candidateForm.types';
import {CodeRequestType} from '@/form/code/codeForm.types';

export interface ICandidatesRepository {
    fetchAll(data?: FormData): Promise<ICandidate[]>;
    create(data: CandidateFormRequestType): Promise<boolean>;
    sendCode(data: CandidatePhoneRequestType): Promise<boolean>;
    checkCode(data: CodeRequestType): Promise<boolean>;
    takeCountStatus(data: CandidateStatusCount): Promise<number>
}

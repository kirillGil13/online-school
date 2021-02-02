import { Moment } from 'moment';

export interface ICandidate {
    id: number;
    name: string;
    phone: string;
    email: string;
    createdAt: Moment;
    status: string;
}
export type CandidateResponseType = {
    id: number;
    name: string;
    phone: string;
    email: string;
    createdAt: string;
    status: string;
};

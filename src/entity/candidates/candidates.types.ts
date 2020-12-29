import { Moment } from 'moment';

export interface ICandidate {
    id: number;
    name: string;
    phone: string;
    email: string;
    createdAt: Moment;
}
export type CandidateResponseType = {
    id: number;
    name: string;
    phone: string;
    email: string;
    createdAt: string;
};

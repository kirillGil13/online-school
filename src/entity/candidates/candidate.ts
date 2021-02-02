import { CandidateResponseType, ICandidate } from '@/entity/candidates';
import moment, { Moment } from 'moment';

export class Candidate implements ICandidate {
    id: number;
    name: string;
    phone: string;
    email: string;
    status: string;
    createdAt: Moment;

    constructor(data: CandidateResponseType) {
        this.id = data.id;
        this.name = data.name;
        this.phone = data.phone;
        this.email = data.email;
        this.createdAt = moment(data.createdAt);
        this.status = 'Client';
    }
}

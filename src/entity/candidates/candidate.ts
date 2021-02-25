import {CandidateResponseType, ICandidate, ICandidateStatus} from '@/entity/candidates';

export class Candidate implements ICandidate {
    id: number;
    createdAt: string;
    status: ICandidateStatus;
    name: string;
    phoneNumber: string;
    email: string;
    isFiction: boolean;
    infoPackName: string;

    constructor(data: CandidateResponseType) {
        this.id = data.id;
        this.name = data.name;
        this.phoneNumber = data.phoneNumber;
        this.email = data.email;
        this.createdAt = this.getTime(data.created_at);
        this.status = data.status;
        this.isFiction = data.isFiction;
        this.infoPackName = data.infoPackName;
    }

    getTime(createdAt: number): string {
        const date = new Date(createdAt * 1000)
        return date.toLocaleString().slice(0,5) + date.toLocaleString().slice(10,17)
    }
}

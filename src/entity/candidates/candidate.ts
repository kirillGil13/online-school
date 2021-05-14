import {CandidateResponseType, ICandidate, ICandidateStatus} from '@/entity/candidates';

export class Candidate implements ICandidate {
    id: number;
    createdAt: string;
    status: ICandidateStatus | null;
    name: string | null;
    phoneNumber: string | null
    email: string | null;
    isFiction: boolean | null;
    infoPackName: string | null;
    callTime: string | null;
    description: string  | null;
    isLocked: boolean | null;

    constructor(data: CandidateResponseType) {
        this.id = data.id;
        this.name = data.name;
        this.phoneNumber = data.phoneNumber ? data.phoneNumber : '';
        this.email = data.email ? data.email : '';
        this.createdAt = this.getTime(data.created_at);
        this.status = data.status;
        this.isFiction = data.isFiction;
        this.infoPackName = data.infoPackName ? data.infoPackName : '';
        this.callTime = this.getTime(data.callTime);
        this.description = data.description ? data.description : '';
        this.isLocked = data.is_locked;
    }

    getTime(seconds: number | null): string {
        if (seconds) {
            const date = new Date(seconds * 1000)
            return date.toLocaleString().slice(0,5) + date.toLocaleString().slice(10,17);
        } else return '';
    }
}

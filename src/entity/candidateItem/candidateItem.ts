import {
    CandidateItemInfoPackResponseType,
    CandidateItemResponseType,
    ICandidateItem,
    ICandidateItemStatus
} from '@/entity/candidateItem/candidateItem.types';

export class CandidateItem implements ICandidateItem {
    id: number;
    createdAt: string;
    status: ICandidateItemStatus;
    name: string;
    phoneNumber: string;
    email: string;
    infoPack: CandidateItemInfoPackResponseType

    constructor(data: CandidateItemResponseType) {
        this.id = data.id;
        this.name = data.name;
        this.phoneNumber = data.phoneNumber;
        this.email = data.email;
        this.createdAt = this.getTime(data.created_at);
        this.status = data.status;
        this.infoPack = data.info_pack;
    }

    getTime(createdAt: number): string {
        const date = new Date(createdAt * 1000)
        return date.toLocaleString().slice(0,5) + date.toLocaleString().slice(10,17)
    }
}

import {CandidatesResponseType, ICandidates} from "@/entity/candidates/candidates.types";

export default class Candidates implements ICandidates {
    id: number;
    name: string;
    phone: string;
    email: string;
    createdAt: string;
    constructor(data: CandidatesResponseType) {
        this.id = data.id;
        this.name = data.name;
        this.phone = data.phone;
        this.email = data.email;
        this.createdAt = data.createdAt;
    }
}
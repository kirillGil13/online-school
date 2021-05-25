
export interface ICandidate {
    id: number;
    createdAt: string;
    callTime: string | null;
    status: ICandidateStatus | null;
    name: string | null;
    phoneNumber: string | null;
    email: string | null;
    isFiction: boolean | null;
    infoPackName: string | null;
    description: string | null;
    isLocked: boolean | null;
}
export interface ICandidateStatus {
    id: number;
    photoLink: string;
    name: string;
}
export type CandidateResponseType = {
    id: number;
    created_at: number;
    status: CandidateStatusResponseType | null;
    name: string | null;
    callTime: number | null;
    phoneNumber: string | null;
    email: string | null;
    isFiction: boolean;
    infoPackName: string | null;
    description: string | null;
    is_locked: boolean | null;
};
export type CandidateStatusResponseType = {
    id: number;
    photoLink: string;
    name: string;
}

export type CandidateRequestType = {
    statusId?: number;
    isFiction?: boolean;
    infoPackId?: number;
    search?: string;
    limit?: number;
    skip?: number;
}

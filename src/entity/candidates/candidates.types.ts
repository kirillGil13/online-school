
export interface ICandidate {
    id: number;
    createdAt: string;
    callTime: string | null;
    status: ICandidateStatus;
    name: string;
    phoneNumber: string | null;
    email: string | null;
    isFiction: boolean;
    infoPackName: string | null;
    description: string
}
export interface ICandidateStatus {
    id: number;
    photoLink: string;
    name: string;
}
export type CandidateResponseType = {
    id: number;
    created_at: number;
    status: CandidateStatusResponseType;
    name: string;
    callTime: number | null;
    phoneNumber: string | null;
    email: string | null;
    isFiction: boolean;
    infoPackName: string | null;
    description: string
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
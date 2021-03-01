
export interface ICandidate {
    id: number;
    createdAt: string;
    status: ICandidateStatus;
    name: string;
    phoneNumber: string;
    email: string;
    isFiction: boolean;
    infoPackName: string;
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
    phoneNumber: string;
    email: string;
    isFiction: boolean;
    infoPackName: string;
};
export type CandidateStatusResponseType = {
    id: number;
    photoLink: string;
    name: string;
}
export type CandidateRequestType = {
    statusId?: number[] |  null[];
    isFiction?: boolean | null;
    infoPackId?: number | null;
    search?: string | null;
    limit?: number | null;
    skip?: number | null;
}

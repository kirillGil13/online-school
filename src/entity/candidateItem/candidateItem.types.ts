export interface ICandidateItem {
    id: number;
    createdAt: string;
    status: ICandidateItemStatus;
    name: string;
    phoneNumber: string;
    email: string;
    infoPack: ICandidateItemInfoPack;
}
export interface ICandidateItemStatus {
    id: number;
    photoLink: string;
    name: string;
}
export interface ICandidateItemInfoPack {
    id: number;
    name: string;
}
export type CandidateItemResponseType = {
    id: number;
    created_at: number;
    status: CandidateItemStatusResponseType;
    name: string;
    phoneNumber: string;
    email: string;
    info_pack: CandidateItemInfoPackResponseType;
};
export type CandidateItemInfoPackResponseType = {
    id: number;
    name: string;
}
export type CandidateItemStatusResponseType = {
    id: number;
    photoLink: string;
    name: string;
}
export interface ICandidateItem {
    id: number;
    createdAt: string;
    status: ICandidateItemStatus;
    name: string;
    phoneNumber: string | null;
    email: string | null;
    callTime: number | null;
    infoPack: ICandidateItemInfoPack | null;
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
    callTime: number | null;
    status: CandidateItemStatusResponseType;
    name: string;
    phoneNumber: string | null;
    email: string | null;
    info_pack: CandidateItemInfoPackResponseType | null;
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
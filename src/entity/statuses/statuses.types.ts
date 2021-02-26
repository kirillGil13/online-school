export interface IStatuses {
    id: number;
    photoLink: string;
    name: string;
}

export type StatusesResponseType = {
    id: number;
    photoLink: string;
    name: string;
}

export type StatusesRequestType = {
    status_id: number;
}
export enum StatusesNameEnum {
    Call = 'Call',
    Waiting = 'Waiting',
    Client = 'Client'
}
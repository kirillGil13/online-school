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
export enum StatusesNameEnum {
    Call = 'Call',
    Waiting = 'Waiting',
    Client = 'Client'
}
export interface ISelect {
    id: number;
    items: ISelectItems[];
}
export interface ISelectItems {
    id: number;
    title: string;
    icon: boolean;
    iconName?: string;
}
export enum SelectStatusNameEnum {
    Call = 'Call',
    Waiting = 'Waiting',
    Client = 'Client'
}
export interface ISelect {
    id: number;
    name: string;
    photoLink?: string;
    extraAction?: boolean;
}
export interface ISelectList {
    text: string;
    value: number;
    isFiction?: boolean;
    minCost?: number;
    maxCost?: number;
}
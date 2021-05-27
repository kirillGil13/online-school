export interface IWithdraw {
    id: number;
    amount: number;
    commission: number;
    adjustedAmount: number;
    createdAt: string;
    status: string;
    getTime(createdAt: number): string;
}

export type WithdrawResponseType = {
    id: number;
    amount: number;
    commission: number;
    adjusted_amount: number;
    created_at: number;
    status: string;
}

export enum WithdrawStatusEnum {
    PROCESS='process',
    ACCEPTED='accepted',
}

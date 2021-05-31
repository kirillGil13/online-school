import {IWithdraw, WithdrawResponseType} from '@/entity/withdraw/withdraw.types';

export default class Withdraw implements IWithdraw {
    id: number;
    amount: number;
    commission: number;
    adjustedAmount: number;
    createdAt: string;
    status: string;

    constructor(data: WithdrawResponseType) {
        this.id = data.id;
        this.amount = data.amount;
        this.commission = data.commission;
        this.adjustedAmount = data.adjusted_amount;
        this.createdAt = this.getTime(data.created_at);
        this.status = data.status;
    }

    getTime(createdAt: number): string {
        const date = new Date(createdAt * 1000);
        return date.toLocaleString().slice(0, 10) + date.toLocaleString().slice(10,17);
    }
}

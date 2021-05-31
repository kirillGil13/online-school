import {IBalance} from '@/entity/balance/balance.types';

export default class Balance implements IBalance{
    balance: number;

    constructor(balance: number) {
        this.balance = balance;
    }
}

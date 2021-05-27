import {IWithdraw} from '@/entity/withdraw/withdraw.types';
import {WithDrawRequestType} from '@/form/withDraw/withDrawForm.types';

export interface IWithdrawRepository {
    fetchAll(data?: FormData): Promise<IWithdraw[]>;
    withdraw(data: WithDrawRequestType): Promise<boolean>;
}

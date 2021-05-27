import {IWithdrawRepository} from '@/repository/withdraw/WithdrawRepository.types';
import Api from '@/repository/api';
import {IWithdraw, WithdrawResponseType} from '@/entity/withdraw/withdraw.types';
import Withdraw from '@/entity/withdraw/withdraw';
import {WithDrawRequestType} from '@/form/withDraw/withDrawForm.types';

export default class WithdrawRepository implements IWithdrawRepository {

    async fetchAll(data?: FormData): Promise<IWithdraw[]> {
        const response = await Api.get('/withdrawals/history', {params: data, paramsSerializer: function paramsSerializer(params) {
                return new URLSearchParams(params).toString()
            }});
        const responseData = response.data as WithdrawResponseType[];
        return responseData.map((withdraw: WithdrawResponseType) => new Withdraw(withdraw));
    }

    async withdraw(data: WithDrawRequestType): Promise<boolean> {
        const response = await Api.post('/withdrawals', data);
        const responseData = response.data;
        return responseData.result;
    }
}

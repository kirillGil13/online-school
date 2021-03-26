import Api from '@/repository/api';
import {IRecoverRepository} from '@/repository/recover/RecoverRepository.types';
import {RecoverSendCodeRequestType} from '@/form/recover/recoverSendCode/recoverSendCodeForm.types';
import {RecoverCheckRequestType} from '@/form/recover/recoverCheck/recoverCheckForm.types';
import {RecoverDoRequestType} from '@/form/recover/recoverDo/recoverDoForm.types';

export class RecoverRepository implements IRecoverRepository {
    async sendCode(data: RecoverSendCodeRequestType): Promise<boolean> {
        const response = await Api.post('/accounts/restorePassword/sendCode', data);
        return response.data.result;
    }
    async checkCode(data: RecoverCheckRequestType): Promise<boolean> {
        const response = await Api.post('/accounts/restorePassword/check', data);
        return response.data.result;
    }
    async recoverDo(data: RecoverDoRequestType): Promise<boolean> {
        const response = await Api.post('/accounts/restorePassword/do', data);
        return response.data.result;
    }
}

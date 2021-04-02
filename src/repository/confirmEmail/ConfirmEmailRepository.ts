import Api from '@/repository/api';
import {IConfirmEmailRepository} from '@/repository/confirmEmail/ConfirmEmailRepository.types';
import {ConfirmEmailRequestType, ConfirmEmailSendCodeRequestType} from '@/entity/common/confirmEmail.types';

export class ConfirmEmailRepository implements IConfirmEmailRepository {
    async sendCode(data: ConfirmEmailSendCodeRequestType): Promise<boolean> {
        const response = await Api.post('/accounts/confirmEmail/sendCode', data);
        const responseData = response.data;
        return responseData.result;
    }
    async confirm(data: ConfirmEmailRequestType): Promise<boolean> {
        const response = await Api.post('/accounts/confirmEmail/do', data);
        const responseData = response.data;
        return responseData.result;
    }
}

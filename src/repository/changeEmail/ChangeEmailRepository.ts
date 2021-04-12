import Api from '@/repository/api';
import {ConfirmEmailRequestType} from '@/entity/common/confirmEmail.types';
import {IChangeEmailRepository} from '@/repository/changeEmail/ChangeEmailRepository.types';
import {ChangeEmailRequestType} from '@/form/changeEmail/changeEmail.types';

export class ChangeEmailRepository implements IChangeEmailRepository {
    async sendCode(data: ChangeEmailRequestType): Promise<boolean> {
        const response = await Api.post('/accounts/changeEmail/sendCode', data);
        const responseData = response.data;
        return responseData.result;
    }
    async confirm(data: ConfirmEmailRequestType): Promise<boolean> {
        const response = await Api.post('/accounts/changeEmail/do', data);
        const responseData = response.data;
        return responseData.result;
    }
}

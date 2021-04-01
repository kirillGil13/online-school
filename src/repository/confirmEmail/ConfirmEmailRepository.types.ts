import {ConfirmEmailRequestType, ConfirmEmailSendCodeRequestType} from '@/entity/common/confirmEmail.types';

export interface IConfirmEmailRepository {
    sendCode(data: ConfirmEmailSendCodeRequestType): Promise<boolean>;
    confirm(data: ConfirmEmailRequestType): Promise<boolean>;
}

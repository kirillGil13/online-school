import {RecoverSendCodeRequestType} from '@/form/recover/recoverSendCode/recoverSendCodeForm.types';
import {RecoverCheckRequestType} from '@/form/recover/recoverCheck/recoverCheckForm.types';
import {RecoverDoRequestType} from '@/form/recover/recoverDo/recoverDoForm.types';

export interface IRecoverRepository {
    sendCode(data: RecoverSendCodeRequestType): Promise<boolean>;
    checkCode(data: RecoverCheckRequestType): Promise<boolean>;
    recoverDo(data: RecoverDoRequestType): Promise<boolean>;
}

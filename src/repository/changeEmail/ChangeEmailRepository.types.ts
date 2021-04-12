import {ConfirmEmailRequestType} from '@/entity/common/confirmEmail.types';
import {ChangeEmailRequestType} from '@/form/changeEmail/changeEmail.types';

export interface IChangeEmailRepository {
    sendCode(data: ChangeEmailRequestType): Promise<boolean>;
    confirm(data: ConfirmEmailRequestType): Promise<boolean>;
}

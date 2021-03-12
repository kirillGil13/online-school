import {MailFormRequestType} from '@/form/mail/mailForm.types';

export interface IMailRepository {
    send(data: MailFormRequestType): Promise<boolean>;
}

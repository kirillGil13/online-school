import Api from '@/repository/api';
import {IMailRepository} from '@/repository/mail/MailRepository.types';
import {MailFormRequestType} from '@/form/mail/mailForm.types';

export class MailRepository implements IMailRepository {
    async send(data: MailFormRequestType): Promise<boolean> {
        const response = await Api.post('/mails/application', data);
        const respData = response.data;
        return respData;
    }
}

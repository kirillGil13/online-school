import {RequestType} from '@/form/form.types';

export type MailFormRequestType = RequestType & {
    name: string;
    phoneNumber: string;
    levelId: number | null;
    topic: string;
    description: string;
    mlm_level: string;
};
export interface IMailFormList {
    text: string;
    value: number | null;
}

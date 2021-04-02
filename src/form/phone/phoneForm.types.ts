import {RequestType} from '@/form/form.types';

export type PhoneRequestType = RequestType & {
    phone_number: string;
    recaptcha_token: string;
};

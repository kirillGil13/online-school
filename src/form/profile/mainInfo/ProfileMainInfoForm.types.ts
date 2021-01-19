import { RequestType } from '@/form/form.types';

export type ProfileMainInfoFormRequestType = RequestType & {
      name: string;
      surname: string;
      login: string;
      description: string;
};

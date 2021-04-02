import { RequestType } from '@/form/form.types';

export type ProfileMainInfoRequestType = RequestType & {
      name: string;
      surname: string;
      description: string;
};

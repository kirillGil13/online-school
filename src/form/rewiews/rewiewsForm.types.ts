import {RequestType} from '@/form/form.types';

export type RewiewsFormRequestType = RequestType & {
    message: string;
    course_id: number | null;
    rewiew_id?: number | null;
}

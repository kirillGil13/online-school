import Api from '@/repository/api';
import { ILessonItemRepository } from './LessonItemRepository.types';
import {ILessonItem, LessonItemResponseType, LessonItemTimeCodeRequestType} from '@/entity/lessonItem/lessonItem.types';
import LessonItem from '@/entity/lessonItem/lessonItem';

export class LessonItemRepository implements ILessonItemRepository {
    async fetchData(lessonId: string): Promise<ILessonItem> {
        const response = await Api.get(`/lessons/${lessonId}`);
        const data = response.data as LessonItemResponseType;
        return new LessonItem(data);
    }
    async setTimeCode(lessonId: string, timeCode: LessonItemTimeCodeRequestType): Promise<boolean> {
        const response = await Api.post(`/lessons/${lessonId}/timeCode`, timeCode);
        return response.data;
    }
}

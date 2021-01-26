import Api from '@/repository/api';
import { ILessonItemRepository } from './LessonItemRepository.types';
import {ILessonItem, LessonItemResponseType} from '@/entity/lessonItem/lessonItem.types';
import LessonItem from '@/entity/lessonItem/lessonItem';

export class LessonItemRepository implements ILessonItemRepository {
    async fetchData(lessonId: string): Promise<ILessonItem> {
        const response = await Api.get(`/lessons/${lessonId}/`);
        const data = response.data as LessonItemResponseType;
        return new LessonItem(data);
    }
}

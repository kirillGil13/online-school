import {ILessonItem} from '@/entity/lessonItem/lessonItem.types';

export interface ILessonItemRepository {
    fetchData(lessonId: string): Promise<ILessonItem>;
}

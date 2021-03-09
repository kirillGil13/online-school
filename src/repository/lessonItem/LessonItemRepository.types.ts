import {ILessonItem, LessonItemTimeCodeRequestType} from '@/entity/lessonItem/lessonItem.types';

export interface ILessonItemRepository {
    fetchData(lessonId: string): Promise<ILessonItem>;
    setTimeCode(lessonId: string, timeCode: LessonItemTimeCodeRequestType): Promise<boolean>;
}

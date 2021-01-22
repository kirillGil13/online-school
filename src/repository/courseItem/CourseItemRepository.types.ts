import {ICourseItem} from '@/entity/courseItem/courseItem.type';

export interface ICourseItemRepository {
    fetchData(courseId: string, lessonId?: string): Promise<ICourseItem>;
}

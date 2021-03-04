import {ICourseItem} from '@/entity/courseItem/courseItem.type';

export interface ICourseItemRepository {
    fetchData(courseId: string): Promise<ICourseItem>;
}

import Api from '@/repository/api';
import {CourseItemResponseType, ICourseItem} from '@/entity/courseItem/courseItem.type';
import CourseItem from '@/entity/courseItem/courseItem';
import {ICourseItemRepository} from '@/repository/courseItem/CourseItemRepository.types';

export class CourseItemRepository implements ICourseItemRepository {
    async fetchData(courseId: string): Promise<ICourseItem> {
        const response = await Api.get(`/courses/${courseId}/`);
        const data = response.data as CourseItemResponseType;
        return new CourseItem(data);
    }
}

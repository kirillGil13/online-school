import Api from '@/repository/api';
import {ICoursesRepository} from '@/repository/courses/CoursesRepository.types';
import {CoursesListItemResponseType, ICoursesListItem} from '@/entity/courses/courses.types';
import CoursesListItem from '@/entity/courses/courses';

export class CoursesRepository implements ICoursesRepository {
    async fetchAll(): Promise<ICoursesListItem[]> {
        const response = await Api.get('/courses');
        const data = response.data as CoursesListItemResponseType[];
        return data.map((course: CoursesListItemResponseType) => new CoursesListItem(course));
    }
}

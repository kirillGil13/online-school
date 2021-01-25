import {ICoursesListItem} from '@/entity/courses/courses.types';

export interface ICoursesRepository {
    fetchAll(): Promise<ICoursesListItem[]>;
}

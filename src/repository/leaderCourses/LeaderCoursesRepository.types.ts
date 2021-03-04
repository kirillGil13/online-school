import {ILeaderCourses} from '@/entity/leaderCourses/leaderCourses.types';

export interface ILeaderCoursesRepository {
    fetchAll(data?: FormData): Promise<ILeaderCourses[]>;
}

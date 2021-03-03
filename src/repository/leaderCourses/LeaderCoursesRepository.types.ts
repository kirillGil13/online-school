import {ILeaderCourses} from '@/entity/leaderCourses/leaderCourses.types';

export interface ILeaderCoursesRepository {
    fetchAll(): Promise<ILeaderCourses[]>;
}

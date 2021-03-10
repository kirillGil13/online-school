import {ILeaderCourses} from '@/entity/leaderCourses/leaderCourses.types';

export interface ICoursesFavouriteRepository {
    fetchAll(): Promise<ILeaderCourses[]>;
}

import Api from '@/repository/api';
import {ILeaderCoursesRepository} from '@/repository/leaderCourses/LeaderCoursesRepository.types';
import {ILeaderCourses, LeaderCoursesResponseType} from '@/entity/leaderCourses/leaderCourses.types';
import LeaderCourses from '@/entity/leaderCourses/leaderCourses';

export class LeaderCoursesRepository implements ILeaderCoursesRepository {
    async fetchAll(): Promise<ILeaderCourses[]> {
        const response = await Api.get('/courses');
        const data = response.data as LeaderCoursesResponseType[];
        return data.map((leaderCourses: LeaderCoursesResponseType) => new LeaderCourses(leaderCourses));
    }
}
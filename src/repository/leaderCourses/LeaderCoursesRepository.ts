import Api from '@/repository/api';
import {ILeaderCoursesRepository} from '@/repository/leaderCourses/LeaderCoursesRepository.types';
import {ILeaderCourses, LeaderCoursesResponseType} from '@/entity/leaderCourses/leaderCourses.types';
import LeaderCourses from '@/entity/leaderCourses/leaderCourses';

export class LeaderCoursesRepository implements ILeaderCoursesRepository {
    async fetchAll(data?: FormData): Promise<ILeaderCourses[]> {
        const response = await Api.get('/courses', {params: data, paramsSerializer: function paramsSerializer(params) {
                return new URLSearchParams(params).toString()
            }});
        const responseData = response.data as LeaderCoursesResponseType[];
        return responseData.map((leaderCourses: LeaderCoursesResponseType) => new LeaderCourses(leaderCourses));
    }
    async fetchMyCourses(): Promise<ILeaderCourses[]> {
        const response = await Api.get('/courses/my');
        const responseData = response.data as LeaderCoursesResponseType[];
        return responseData.map((leaderCourses: LeaderCoursesResponseType) => new LeaderCourses(leaderCourses));
    }
}
import Api from '@/repository/api';
import {ICoursesFavouriteRepository} from '@/repository/corsesFavourite/CoursesFavouriteRepository.types';
import {ILeaderCourses, LeaderCoursesResponseType} from '@/entity/leaderCourses/leaderCourses.types';
import LeaderCourses from '@/entity/leaderCourses/leaderCourses';

export class CoursesFavouriteRepository implements ICoursesFavouriteRepository {
    async fetchAll(): Promise<ILeaderCourses[]> {
        const response = await Api.get('/courses/favourites');
        const data = response.data as LeaderCoursesResponseType[];
        return data.map((course: LeaderCoursesResponseType) => new LeaderCourses(course));
    }
}

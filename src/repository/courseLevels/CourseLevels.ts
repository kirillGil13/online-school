import Api from '@/repository/api';
import {ICourseLevelsRepository} from '@/repository/courseLevels/CourseLevels.types';
import {CourseLevelsResponseType, ICourseLevels} from '@/entity/courseLevels/courseLevels.types';
import CourseLevels from '@/entity/courseLevels/courseLevels';

export class CourseLevelsRepository implements ICourseLevelsRepository {
    async fetchAll(): Promise<ICourseLevels[]> {
        const response = await Api.get('/courseLevels');
        const data = response.data as CourseLevelsResponseType[];
        return data.map((courseLevels: CourseLevelsResponseType) => new CourseLevels(courseLevels));
    }
}
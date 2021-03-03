import {ICourseLevels} from '@/entity/courseLevels/courseLevels.types';

export interface ICourseLevelsRepository {
    fetchAll(): Promise<ICourseLevels[]>;
}

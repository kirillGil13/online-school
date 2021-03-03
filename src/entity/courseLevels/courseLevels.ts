import {CourseLevelsResponseType, ICourseLevels} from '@/entity/courseLevels/courseLevels.types';

export default class CourseLevels implements ICourseLevels {
    id: number;
    name: string;
    constructor(data: CourseLevelsResponseType) {
        this.id = data.id;
        this.name = data.name;
    }
}
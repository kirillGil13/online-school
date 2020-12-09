import { CourseItemResponseType, ICourseItem } from './courseItem.type';

export default class CourseItem implements ICourseItem {
    id: number;
    title: string;
    description: string;
    isTestingRequire: boolean;
    createdAt: string;
    constructor(data: CourseItemResponseType) {
        this.id = data.id;
        this.title = data.title;
        this.description = data.description;
        this.isTestingRequire = data.isTestingRequire;
        this.createdAt = data.createdAt;
    }
}
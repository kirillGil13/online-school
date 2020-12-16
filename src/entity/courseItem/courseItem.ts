import { CourseItemResponseType, ICourseItem, ILessons } from './courseItem.type';

export default class CourseItem implements ICourseItem {
    id: number;
    title: string;
    description: string;
    isTestingRequire: boolean;
    createdAt: string;
    currentLessonId: number;
    lessons: ILessons[] = []
    constructor(data: CourseItemResponseType) {
        this.id = data.id;
        this.title = data.title;
        this.description = data.description;
        this.isTestingRequire = data.isTestingRequire;
        this.createdAt = data.createdAt;
        this.currentLessonId = data.currentLessonId;
        for (let i = 0; i < data.lessons.length; i++) {
            this.lessons.push(data.lessons[i]);
            
        }
    }
}
export interface ICourseItem {
    id: number;
    title: string;
    description: string;
    isTestingRequire: boolean;
    createdAt: string;
    lessons: ILessons[];
    currentLessonId: number;
}
export interface ILessons {
    id: number,
    title: string,
    lessonPassed: boolean,
    available: boolean
}

export type CourseItemResponseType = {
    id: number;
    title: string;
    description: string;
    isTestingRequire: boolean;
    createdAt: string;
    lessons: LessonsResponseType[];
    currentLessonId: number;
}
export type LessonsResponseType = {
    id: number,
    title: string,
    lessonPassed: boolean,
    available: boolean
}

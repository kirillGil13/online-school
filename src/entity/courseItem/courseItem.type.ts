export interface ICourseItem {
    id: number;
    title: string;
    description: string;
    isTestingRequire: boolean;
    createdAt: string;
    lessons: ICourseLessons[];
    currentLessonId: number;
}
export interface ICourseLessons {
    id: number;
    title: string;
    lessonPassed: boolean;
    available: boolean;
    type(): string;
}

export type CourseItemResponseType = {
    id: number;
    title: string;
    description: string;
    isTestingRequire: boolean;
    createdAt: string;
    lessons: CourseLessonsResponseType[];
    currentLessonId: number;
}
export type CourseLessonsResponseType = {
    id: number;
    title: string;
    lessonPassed: boolean;
    available: boolean;
}

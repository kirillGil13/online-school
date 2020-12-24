export interface ICourseItem {
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
    lessons: CourseLessonsResponseType[];
    currentLessonId: number;
}
export type CourseLessonsResponseType = {
    id: number;
    title: string;
    lessonPassed: boolean;
    available: boolean;
}

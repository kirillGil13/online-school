export interface ICourseItem {
    id: number;
    title: string;
    description: string;
    isTestingRequire: boolean;
    createdAt: string;
    lessons: ICourseLessons[];
    currentLessonId: number;
    materials: ICourseMaterials[];
    resolveType(index: number, routeParam: string): string;
}
export interface ICourseLessons {
    id: number;
    title: string;
    lessonPassed: boolean;
    available: boolean;
}
export interface ICourseMaterials {
    name: string;
    filename: string;
}

export type CourseItemResponseType = {
    id: number;
    title: string;
    description: string;
    isTestingRequire: boolean;
    createdAt: string;
    lessons: CourseLessonsResponseType[];
    currentLessonId: number;
    materials: CourseMaterialsResponseType[];
}
export type CourseLessonsResponseType = {
    id: number;
    title: string;
    lessonPassed: boolean;
    available: boolean;
}
export type CourseMaterialsResponseType = {
    name: string;
    filename: string;
}

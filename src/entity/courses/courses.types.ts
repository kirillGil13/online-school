export interface ICoursesListItem {
    id: number
    title: string;
    cover: string;
    totalLesson: number;
    lessonPassed: number;
    duration: number;
    rating: number;
    progress: number;
}
export type CoursesListItemRequestType = {
    id: number
    title: string;
    cover: string;
    totalLesson: number;
    lessonPassed: number;
    duration: number;
    rating: number;
}
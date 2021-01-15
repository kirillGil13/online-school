export interface ICoursesListItem {
    id: number;
    title: string;
    cover: string;
    totalLesson: number;
    lessonPassed: number;
    duration: number;
    rating: number;
    progress: number;
    fullDuration(): string;
}
export type CoursesListItemResponseType = {
    id: number;
    title: string;
    cover: string;
    totalLesson: number;
    lessonPassed: number;
    duration: number;
    rating: number;
}
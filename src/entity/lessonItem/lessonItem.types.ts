export interface ILessonItem {
    title: string;
    videoLink: string;
    description: string;
    available: true;
    userViewingVideoDuration: number;
}
export type LessonItemResponseType = {
    title: string;
    videoLink: string;
    description: string;
    available: true;
    userViewingVideoDuration: number;
}
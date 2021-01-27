export interface ILessonItem {
    title: string;
    videoUid: string;
    videoPath: string;
    description: string;
    available: boolean;
    userViewingVideoDuration: number;
}
export type LessonItemResponseType = {
    title: string;
    videoUid: string;
    videoPath: string;
    description: string;
    available: true;
    userViewingVideoDuration: number;
}
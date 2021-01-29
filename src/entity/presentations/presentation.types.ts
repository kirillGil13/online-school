export interface IPresentationCategory {
    id: number;
    name: string;
    presentations: IPresentation[];
}

export interface IPresentation {
    id: number;
    name: string;
    description: string;
    filename: string;
    fileType: string;
    fileSize: number;
    isPaid: boolean;
    cover: string;
    createdAt: string;
    updatedAt: string;
}
export type PresentationCategoryResponseType = {
    id: number;
    name: string;
    presentations: PresentationResponseType[];
}
export type PresentationResponseType = {
    id: number;
    name: string;
    description: string;
    filename: string;
    fileType: string;
    fileSize: number;
    isPaid: boolean;
    cover: string;
    createdAt: string;
    updatedAt: string;
}
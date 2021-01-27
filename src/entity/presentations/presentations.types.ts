export interface IPresentationsListItem {
    id: number;
    name: string;
    subcategories: IPresentationSubcategories[];
}

export interface IPresentationSubcategories {
    id: number;
    name: string;
    presentations: IPresentationPresentations[];
}

export interface IPresentationPresentations {
    id: number;
    name: string;
    filename: string;
    fileType: string;
    fileSize: number;
    isPaid: boolean;
    cover: string;
    createdAt: string;
    updatedAt: string;
}

export type PresentationsListItemResponseType = {
    id: number;
    name: string;
    subcategories: PresentationSubcategoriesResponseType[];
}

export type PresentationSubcategoriesResponseType = {
    id: number;
    name: string;
    presentations: PresentationPresentationsResponseType[];
}

export type PresentationPresentationsResponseType = {
    id: number;
    name: string;
    filename: string;
    fileType: string;
    fileSize: number;
    isPaid: boolean;
    cover: string;
    createdAt: string;
    updatedAt: string;
}

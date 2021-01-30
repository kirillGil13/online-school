export interface IDocument {
    id: number;
    name: string;
    filename: string;
    fileType: string;
    fileSize: number;
    isPaid: boolean;
    createdAt: string;
    updatedAt: string;
}
export type DocumentResponseType = {
    id: number;
    name: string;
    filename: string;
    fileType: string;
    fileSize: number;
    isPaid: boolean;
    createdAt: string;
    updatedAt: string;
}
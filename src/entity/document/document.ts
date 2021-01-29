import {DocumentResponseType, IDocument} from '@/entity/document/document.types';

export default class Documents implements IDocument {
    id: number;
    name: string;
    filename: string;
    fileType: string;
    fileSize: number;
    isPaid: boolean;
    createdAt: string;
    updatedAt: string;
    constructor(data: DocumentResponseType) {
        this.id = data.id;
        this.name = data.name;
        this.filename = data.filename;
        this.fileType = data.fileType;
        this.fileSize = data.fileSize;
        this.isPaid = data.isPaid;
        this.createdAt = data.createdAt;
        this.updatedAt = data.updatedAt;
    }
}
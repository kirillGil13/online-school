import {IPictureUpload} from '@/entity/common/pictureUpload.types';

export interface IPictureUploadRepository {
    set(data: FormData): Promise<IPictureUpload>;
}

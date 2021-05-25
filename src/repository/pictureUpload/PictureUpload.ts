import Api from '@/repository/api';
import {
    IPictureUpload,
    PictureUploadResponseType
} from '@/entity/common/pictureUpload.types';
import {IPictureUploadRepository} from '@/repository/pictureUpload/PictureUpload.types';

export class PictureUploadRepository implements IPictureUploadRepository {
    async set(data: FormData): Promise<IPictureUpload> {
        const response = await Api.postFile({url: '/files/images/upload', baseURL: process.env.VUE_APP_FILE_API_URL!}, data);
        const dataResp = response.data as PictureUploadResponseType;
        return dataResp;
    }
}

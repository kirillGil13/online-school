import Api from '@/repository/api';
import {
    IProfilePicture,
    ProfilePictureResponseType
} from '@/entity/common/profilePicture.types';
import {IProfilePictureRepository} from '@/repository/profilePicture/ProfilePicture.types';

export class ProfilePictureRepository implements IProfilePictureRepository {
    async set(data: FormData): Promise<IProfilePicture> {
        console.log(process.env.VUE_APP_FILE_API_URL)
        const response = await Api.postFile({url: '/files/images/upload', baseURL: process.env.VUE_APP_FILE_API_URL!}, data);
        const dataResp = response.data as ProfilePictureResponseType;
        return dataResp;
    }
}

import {IProfilePicture} from '@/entity/common/profilePicture.types';

export interface IProfilePictureRepository {
    set(data: FormData): Promise<IProfilePicture>;
}

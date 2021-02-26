import {VideoAccessFormRequestType} from '@/form/videoAccess/videoAccessForm.types';
import {ICandidateItem} from '@/entity/candidateItem/candidateItem.types';

export interface IVideoAccessRepository {
    getAccess(data: VideoAccessFormRequestType): Promise<ICandidateItem>;
}
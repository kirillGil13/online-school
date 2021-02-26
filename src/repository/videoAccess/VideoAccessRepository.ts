import Api from '@/repository/api';
import {IVideoAccessRepository} from '@/repository/videoAccess/VideoAccessRepository.types';
import {VideoAccessFormRequestType} from '@/form/videoAccess/videoAccessForm.types';
import {CandidateItemResponseType, ICandidateItem} from '@/entity/candidateItem/candidateItem.types';
import {CandidateItem} from '@/entity/candidateItem/candidateItem';

export class VideoAccessRepository implements IVideoAccessRepository {
    async getAccess(data: VideoAccessFormRequestType): Promise<ICandidateItem> {
        const response = await Api.post('/candidates', data);
        const respData = response.data as CandidateItemResponseType;
        return new CandidateItem(respData);
    }
}

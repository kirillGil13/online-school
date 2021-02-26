import Api from '@/repository/api';
import {IStatusIconsRepository} from '@/repository/statusIcons/StatusIconsRepository.types';
import {IStatusIcons, StatusIconsResponseType} from '@/entity/statusIcons/statusIcons.types';
import StatusIcons from '@/entity/statusIcons/statusIcons';

export class StatusIconsRepository implements IStatusIconsRepository {
    async fetchAll(): Promise<IStatusIcons[]> {
        const response = await Api.get('/icons');
        const data = response.data as StatusIconsResponseType[];
        return data.map((statusIcon: StatusIconsResponseType) => new StatusIcons(statusIcon));
    }
}

import {IStatusIcons} from '@/entity/statusIcons/statusIcons.types';

export interface IStatusIconsRepository {
    fetchAll(): Promise<IStatusIcons[]>;
}

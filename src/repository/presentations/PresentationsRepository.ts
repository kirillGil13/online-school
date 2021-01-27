import Api from '@/repository/api';
import {IPresentationsRepository} from '@/repository/presentations/PresentationsRepository.types';
import {PresentationsListItemResponseType, IPresentationsListItem} from '@/entity/presentations/presentations.types';
import PresentationsListItem from '@/entity/presentations/presentations';

export class PresentationsRepository implements IPresentationsRepository {
    async fetchAll(): Promise<IPresentationsListItem[]> {
        const response = await Api.get('/presentation');
        const data = response.data as PresentationsListItemResponseType[];
        return data.map((presentation: PresentationsListItemResponseType) => new PresentationsListItem(presentation));
    }
}

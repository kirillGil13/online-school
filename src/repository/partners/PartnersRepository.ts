import Api from '@/repository/api';

import { IPartnersRepository } from '@/repository/partners';
import { Partner, IPartner, PartnerResponseType } from '@/entity/partners';

export class PartnersRepository implements IPartnersRepository {
    async fetchAll(): Promise<IPartner[]> {
        const response = await Api.get('/user/partners');
        const data = response.data as PartnerResponseType[];
        return data.map((candidate: PartnerResponseType) => new Partner(candidate));
    }
}

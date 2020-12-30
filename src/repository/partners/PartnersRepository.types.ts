import { IPartner } from '@/entity/partners';

export interface IPartnersRepository {
    fetchAll(): Promise<IPartner[]>;
}

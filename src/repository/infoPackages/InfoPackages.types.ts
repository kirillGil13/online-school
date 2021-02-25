import {IInfoPackage} from '@/entity/infoPackages/infoPackage.types';

export interface IInfoPackagesRepository {
    fetchAll(): Promise<IInfoPackage[]>;
}

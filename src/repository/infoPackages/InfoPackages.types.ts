import {IInfoPackage} from '@/entity/infoPackages/infoPackage.types';
import {IInfoPackageItem} from '@/entity/infoPackageItem/infoPackageItem.types';

export interface IInfoPackagesRepository {
    fetchAll(): Promise<IInfoPackage[]>;
    fetchData(route: string): Promise<IInfoPackageItem>;
}

import {IInfoPackage} from '@/entity/infoPackages/infoPackage.types';
import {IInfoPackageItem, InfoPackageItemRequestType} from '@/entity/infoPackageItem/infoPackageItem.types';

export interface IInfoPackagesRepository {
    fetchAll(): Promise<IInfoPackage[]>;
    fetchData(route: string, request: InfoPackageItemRequestType): Promise<IInfoPackageItem>;
}

import Api from '@/repository/api';
import {IInfoPackagesRepository} from '@/repository/infoPackages/InfoPackages.types';
import {IInfoPackage, InfoPackageResponseType} from '@/entity/infoPackages/infoPackage.types';
import InfoPackage from '@/entity/infoPackages/infoPackage';
import {IInfoPackageItem, InfoPackageItemResponseType} from '@/entity/infoPackageItem/infoPackageItem.types';
import InfoPackageItem from '@/entity/infoPackageItem/infoPackageItem';

export class InfoPackagesRepository implements IInfoPackagesRepository {
    async fetchAll(): Promise<IInfoPackage[]> {
        const response = await Api.get('/infoPacks');
        const data = response.data as InfoPackageResponseType[];
        return data.map((infoPackage: InfoPackageResponseType) => new InfoPackage(infoPackage));
    }
    async fetchData(route: string): Promise<IInfoPackageItem> {
        const response = await Api.get(`/infoPacks/${route}`);
        const data = response.data as InfoPackageItemResponseType;
        return new InfoPackageItem(data);
    }
}

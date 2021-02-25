import Api from '@/repository/api';
import {IInfoPackagesRepository} from '@/repository/infoPackages/InfoPackages.types';
import {IInfoPackage, InfoPackageResponseType} from '@/entity/infoPackages/infoPackage.types';
import InfoPackage from '@/entity/infoPackages/infoPackage';

export class InfoPackagesRepository implements IInfoPackagesRepository {
    async fetchAll(): Promise<IInfoPackage[]> {
        const response = await Api.get('/infoPacks');
        const data = response.data as InfoPackageResponseType[];
        return data.map((infoPackage: InfoPackageResponseType) => new InfoPackage(infoPackage));
    }
}

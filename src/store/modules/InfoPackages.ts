import {Module, getModule, VuexModule} from 'vuex-module-decorators';
import store from '@/store';
import {InfoPackageResponseType} from '@/entity/infoPackage/infoPackage.types';

@Module({
    namespaced: true,
    name: 'infoPackages',
    store,
    dynamic: true,
})
class InfoPackagesModule extends VuexModule {
    infoPackages: InfoPackageResponseType[] = [
        {
            id: 0,
            title: 'Инфопакет маркетинг план Finiko',
            cover: 'https://lh3.googleusercontent.com/proxy/uHcx7uivb0egzBfH_f_F5uQ7v7TCU569nSjQZw4_Osp9OgnnyCrSHHmC_Eg_Szinb_fWlQ-DeVFn3Cg4DKntBFadZn2R24d_qQD1fUDhu0Q-xwz27nLf2_Pau_JEfJToRASFDA',
            openCount: 23,
            registerCount: 13,
            link: ''
        },
        {
            id: 1,
            title: 'Инфопакет маркетинг план Finiko',
            cover: 'https://lh3.googleusercontent.com/proxy/uHcx7uivb0egzBfH_f_F5uQ7v7TCU569nSjQZw4_Osp9OgnnyCrSHHmC_Eg_Szinb_fWlQ-DeVFn3Cg4DKntBFadZn2R24d_qQD1fUDhu0Q-xwz27nLf2_Pau_JEfJToRASFDA',
            openCount: 23,
            registerCount: 13,
            link: ''
        },
        {
            id: 2,
            title: 'Инфопакет маркетинг план Finiko',
            cover: 'https://lh3.googleusercontent.com/proxy/uHcx7uivb0egzBfH_f_F5uQ7v7TCU569nSjQZw4_Osp9OgnnyCrSHHmC_Eg_Szinb_fWlQ-DeVFn3Cg4DKntBFadZn2R24d_qQD1fUDhu0Q-xwz27nLf2_Pau_JEfJToRASFDA',
            openCount: 23,
            registerCount: 13,
            link: ''
        },

    ]
}

export const InfoPackagesStore = getModule(InfoPackagesModule)
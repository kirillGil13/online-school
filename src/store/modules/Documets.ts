import {Module, getModule, VuexModule} from 'vuex-module-decorators';
import store from '@/store';
import {DocumentResponseType} from '@/entity/document/document.types';

@Module({
    namespaced: true,
    name: 'documents',
    store,
    dynamic: true,
})
class DocumentsModule extends VuexModule {
    documents: DocumentResponseType[] = [
        {
            id: 0,
            name: 'Оферта пользователя',
            filename: 'oferta',
            fileType: 'pdf',
            fileSize: 278,
            isPaid: true,
            createdAt: '12313',
            updatedAt: '123123123',
        },
        {
            id: 1,
            name: 'Оферта пользователя',
            filename: 'oferta',
            fileType: 'pdf',
            fileSize: 278,
            isPaid: true,
            createdAt: '12313',
            updatedAt: '123123123',
        },
        {
            id: 2,
            name: 'Оферта пользователя',
            filename: 'oferta',
            fileType: 'pdf',
            fileSize: 278,
            isPaid: true,
            createdAt: '12313',
            updatedAt: '123123123',
        },
        {
            id: 3,
            name: 'Оферта пользователя',
            filename: 'oferta',
            fileType: 'pdf',
            fileSize: 278,
            isPaid: true,
            createdAt: '12313',
            updatedAt: '123123123',
        },

    ]
}

export const DocumentsStore = getModule(DocumentsModule)
import { Module, getModule, VuexModule } from 'vuex-module-decorators';
import IProductPresentations from '@/entity/materials/presentations/productsPresentation.types';
import store from '@/store';

@Module({
    namespaced: true,
    name: 'presentations',
    store,
    dynamic: true,
})
class Presentations extends VuexModule {
    presentations: IProductPresentations[] = [
        {
            id: 1,
            name: 'd',
            subcategories: [
                {
                    id: 1,
                    name: 'Продукты',
                    presentations: [
                        {
                            id: 1,
                            name: 'eget dolor quis a',
                            filename: 'eget_dolor_quis_a.pdf',
                            fileType: 'pdf',
                            fileSize: 272,
                            isPaid: false,
                            cover: 'https://i.pinimg.com/736x/be/9f/41/be9f417ed861b0ce4e4df3106c108d20.jpg',
                            createdAt: '221112',
                            updatedAt: '22212',
                        },
                    ],
                },
                {
                    id: 2,
                    name: 'Маркетинг план',
                    presentations: [
                        {
                            id: 1,
                            name: 'eget dolor quis a',
                            filename: 'eget_dolor_quis_a.pdf',
                            fileType: 'pdf',
                            fileSize: 272,
                            isPaid: false,
                            cover: 'https://i.pinimg.com/736x/be/9f/41/be9f417ed861b0ce4e4df3106c108d20.jpg',
                            createdAt: '221112',
                            updatedAt: '22212',
                        },
                        {
                            id: 2,
                            name: 'eget dolor quis a',
                            filename: 'eget_dolor_quis_a.pdf',
                            fileType: 'pdf',
                            fileSize: 272,
                            isPaid: false,
                            cover: 'https://i.pinimg.com/736x/be/9f/41/be9f417ed861b0ce4e4df3106c108d20.jpg',
                            createdAt: '221112',
                            updatedAt: '22212',
                        },
                    ],
                },
            ],
        },
    ]
    // на будущее
    // @MutationAction
    // async fetchPresentations(): Promise<{presentations: IProductPresentations[]}> {
    //     const presentations = await store.$repository.presentations.fetch()
    //     return {presentations}
    // }
}

export const PresentationStore = getModule(Presentations)

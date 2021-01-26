import { Module, getModule, VuexModule, MutationAction, Mutation } from 'vuex-module-decorators';
import IProductPresentations from '@/entity/materials/presentations/productsPresentation.types';
import { IPresentationType } from '@/entity/materials/presentations/presentation.types';
import store from '@/store';

@Module({
    namespaced: true,
    name: 'presentations',
    store,
    dynamic: true,
})
class Presentations extends VuexModule {
    presentations: IProductPresentations[] | null = null
    promoPresentations: IPresentationType[] | null = null
    // на будущее
    // @MutationAction
    // async fetchPresentations(): Promise<{presentations: IProductPresentations[]}> {
    //     const presentations = await store.$repository.presentations.fetch()
    //     return {presentations}
    // }
    @Mutation
    fetchPresentations(): void {
        this.presentations = [{
            id: 1,
            name: 'd',
            subcategories: [
                {
                    id: 1,
                    name: 'Автомобили 25%',
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
                    name: 'Недвижимость 25%',
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
    }

    @Mutation
    fetchPromoPresentations(): void {
        this.promoPresentations = [
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
                name: 'eget dolor quis b',
                filename: 'eget_dolor_quis_a.pdf',
                fileType: 'pdf',
                fileSize: 272,
                isPaid: false,
                cover: 'https://i.pinimg.com/736x/be/9f/41/be9f417ed861b0ce4e4df3106c108d20.jpg',
                createdAt: '221112',
                updatedAt: '22212',
            },
            {
                id: 3,
                name: 'eget dolor quis a',
                filename: 'eget_dolor_quis_a.pdf',
                fileType: 'pdf',
                fileSize: 272,
                isPaid: false,
                cover: 'https://i.pinimg.com/736x/be/9f/41/be9f417ed861b0ce4e4df3106c108d20.jpg',
                createdAt: '221112',
                updatedAt: '22212',
            }, {
                id: 4,
                name: 'eget dolor quis a',
                filename: 'eget_dolor_quis_a.pdf',
                fileType: 'pdf',
                fileSize: 272,
                isPaid: false,
                cover: 'https://i.pinimg.com/736x/be/9f/41/be9f417ed861b0ce4e4df3106c108d20.jpg',
                createdAt: '221112',
                updatedAt: '22212',
            }, {
                id: 5,
                name: 'eget dolor quis a',
                filename: 'eget_dolor_quis_a.pdf',
                fileType: 'pdf',
                fileSize: 272,
                isPaid: false,
                cover: 'https://i.pinimg.com/736x/be/9f/41/be9f417ed861b0ce4e4df3106c108d20.jpg',
                createdAt: '221112',
                updatedAt: '22212',
            },
        ]
    }
}

export const PresentationStore = getModule(Presentations)
import {Module, getModule, VuexModule} from 'vuex-module-decorators';
import store from '@/store';
import {IPresentationCategory} from '@/entity/presentations/presentation.types';

@Module({
    namespaced: true,
    name: 'presentations',
    store,
    dynamic: true,
})
class Presentations extends VuexModule {
    presentations: IPresentationCategory[] = [
        {
            id: 1,
            name: 'Продукты',
            presentations: [
                {
                    id: 1,
                    name: 'eget dolor quis a',
                    filename: 'eget_dolor_quis_a.pdf',
                    description: 'Вы решили, что пора наконец обновить автомобиль? Выбрали подходящую и достойную марку и модель, но реальные возможности не всегда совпадают с планами fdkfjhdjfhjdhfjdhfjdf',
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
                    description: 'Вы решили, что пора наконец обновить автомобиль? Выбрали подходящую и достойную марку и модель, но реальные возможности не всегда совпадают с планами jkjfkdjkfjdkfjkdjfdf',
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
                    description: 'Вы решили, что пора наконец обновить автомобиль? Выбрали подходящую и достойную марку и модель, но реальные возможности не всегда совпадают с планамиииииии jfkgjjkfgjkfgkfkjg',
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
    ]
    // на будущее
    // @MutationAction
    // async fetchPresentations(): Promise<{presentations: IProductPresentations[]}> {
    //     const presentations = await store.$repository.presentations.fetch()
    //     return {presentations}
    // }
}

export const PresentationStore = getModule(Presentations)
import { getModule, Module, MutationAction, VuexModule } from 'vuex-module-decorators';
import store from '@/store';
import {ILessonItem} from '@/entity/lessonItem/lessonItem.types';

@Module({
    namespaced: true,
    name: 'lessonItem',
    store,
    dynamic: true,
})
class LessonItemModule extends VuexModule {
    lessonItem: ILessonItem = {
        title: '',
        videoLink: '',
        description: '',
        available: false,
        userViewingVideoDuration: 0
    };

    @MutationAction
    async fetchData(lessonId: string): Promise<{ lessonItem: ILessonItem }> {
        const lessonItem = await store.$repository.lessonItem.fetchData(lessonId);
        return { lessonItem };
    }
}

export const LessonItemStore = getModule(LessonItemModule);

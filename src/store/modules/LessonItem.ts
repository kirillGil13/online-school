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
    lessonItem: ILessonItem | null  = null;
    lessonLoaded = false;

    @MutationAction
    async fetchData(lessonId: string): Promise<{ lessonItem: ILessonItem; lessonLoaded: boolean }> {
        const lessonItem = await store.$repository.lessonItem.fetchData(lessonId);
        const lessonLoaded = true;
        return { lessonItem, lessonLoaded };
    }
}

export const LessonItemStore = getModule(LessonItemModule);

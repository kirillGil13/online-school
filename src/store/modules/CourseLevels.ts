import { getModule, Module, MutationAction, VuexModule } from 'vuex-module-decorators';
import store from '@/store';
import {ICourseLevels} from '@/entity/courseLevels/courseLevels.types';

@Module({
    namespaced: true,
    name: 'courseLevels',
    store,
    dynamic: true,
})
class CourseLevelsModule extends VuexModule {
    courseLevels: ICourseLevels[] = [];
    courseLevelsLoaded = false;

    @MutationAction
    async fetchAll(): Promise<{ courseLevels: ICourseLevels[]; courseLevelsLoaded: boolean }> {
        const courseLevels = await store.$repository.courseLevels.fetchAll();
        let courseLevelsLoaded = false;
        if (courseLevels) {
            courseLevelsLoaded = true
        }
        return { courseLevels, courseLevelsLoaded };
    }
}

export const CourseLevelsStore = getModule(CourseLevelsModule);

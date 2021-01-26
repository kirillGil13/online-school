import { getModule, Module, MutationAction, VuexModule } from 'vuex-module-decorators';
import store from '@/store';
import {ICoursesListItem} from '@/entity/courses/courses.types';

@Module({
    namespaced: true,
    name: 'courses',
    store,
    dynamic: true,
})
class CoursesModule extends VuexModule {
    courses: ICoursesListItem[] = [];

    @MutationAction
    async fetchAll(): Promise<{ courses: ICoursesListItem[] }> {
        const courses = await store.$repository.courses.fetchAll();
        return { courses };
    }
}

export const CoursesStore = getModule(CoursesModule);

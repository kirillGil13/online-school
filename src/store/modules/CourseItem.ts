import { getModule, Module, MutationAction, VuexModule } from 'vuex-module-decorators';
import store from '@/store';
import {ICourseItem} from '@/entity/courseItem/courseItem.type';

@Module({
    namespaced: true,
    name: 'courseItem',
    store,
    dynamic: true,
})
class CourseItemModule extends VuexModule {
    courseItem: ICourseItem | null  = null;
    courseLoaded = false;

    @MutationAction
    async fetchData(data: {courseId: string; lessonId: string}): Promise<{ courseItem: ICourseItem; courseLoaded: boolean }> {
        const courseItem = await store.$repository.courseItem.fetchData(data.courseId);
        let courseLoaded = false;
        if (courseItem) {
            courseLoaded = true;
        }
        return { courseItem, courseLoaded };
    }
}

export const CourseItemStore = getModule(CourseItemModule);

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
    courseItem: ICourseItem = {
        id: 0,
        title: '',
        description: '',
        isTestingRequire: false,
        createdAt: '',
        currentLessonId: 0,
        lessons: []
    };

    @MutationAction
    async fetchData(data: {courseId: string; lessonId?: string}): Promise<{ courseItem: ICourseItem }> {
        const courseItem = await store.$repository.courseItem.fetchData(data.courseId, data.lessonId);
        return { courseItem };
    }
}

export const CourseItemStore = getModule(CourseItemModule);

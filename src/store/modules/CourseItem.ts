import { getModule, Module, MutationAction, VuexModule } from 'vuex-module-decorators';
import store from '@/store';
import {ICourseItem} from '@/entity/courseItem/courseItem.type';
import {IDefaultCourseItem} from '@/entity/courseItem/courseItemDefault';

@Module({
    namespaced: true,
    name: 'courseItem',
    store,
    dynamic: true,
})
class CourseItemModule extends VuexModule {
    courseItem: ICourseItem | null  = null;
    courseLoaded = false;
    courseItemDefault: IDefaultCourseItem = {
        id: 'MA',
        author: 'Maksimov Aidar',
        socials: [
            {id: 'instagram', name: 'Instagram'},
            {id: 'vk', name: 'VK'}
        ],
        authorDescription: 'dasdasdiwdoqwbouwduodhwquod',
    }

    @MutationAction
    async fetchData(courseId: string): Promise<{ courseItem: ICourseItem; courseLoaded: boolean }> {
        const courseItem = await store.$repository.courseItem.fetchData(courseId);
        let courseLoaded = false;
        if (courseItem) {
            courseLoaded = true;
        }
        return { courseItem, courseLoaded };
    }
}

export const CourseItemStore = getModule(CourseItemModule);

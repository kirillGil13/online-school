import {getModule, Module, MutationAction, VuexModule} from 'vuex-module-decorators';
import store from '@/store';
import {ILeaderCourses} from '@/entity/leaderCourses/leaderCourses.types';

@Module({
    namespaced: true,
    name: 'coursesFavourite',
    store,
    dynamic: true
})
class CoursesFavouriteModule extends VuexModule{
    coursesFavourite: ILeaderCourses[] = [];
    coursesFavouriteLoaded = false;

    @MutationAction
    async fetchAll(): Promise<{ coursesFavourite: ILeaderCourses[]; coursesFavouriteLoaded: boolean }> {
        const coursesFavourite = await store.$repository.coursesFavourite.fetchAll();
        let coursesFavouriteLoaded = false;
        if (coursesFavourite) {
            coursesFavouriteLoaded = true;
        }
        return { coursesFavourite, coursesFavouriteLoaded }
    }
}
export const CoursesFavouriteStore = getModule(CoursesFavouriteModule);
import {getModule, Module, MutationAction, VuexModule} from 'vuex-module-decorators';
import store from '@/store';
import {ILeaderCourses} from '@/entity/leaderCourses/leaderCourses.types';

@Module({
    namespaced: true,
    name: 'myCourses',
    store,
    dynamic: true,
})
class MyCoursesModule extends VuexModule {
    myCourses: ILeaderCourses[] = [];
    myCoursesLoaded = false;

    @MutationAction
    async fetchMyCourses(): Promise<{ myCourses: ILeaderCourses[]; myCoursesLoaded: boolean }> {
        const myCourses = await store.$repository.leaderCourses.fetchMyCourses();
        let myCoursesLoaded = false;
        if (myCourses) {
            myCoursesLoaded = true;
        }
        return { myCourses, myCoursesLoaded }
    }
}

export const MyCoursesStore = getModule(MyCoursesModule);

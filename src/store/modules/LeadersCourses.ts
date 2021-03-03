import {getModule, Module, MutationAction, VuexModule} from 'vuex-module-decorators';
import store from '@/store';
import {ILeaderCourses} from '@/entity/leaderCourses/leaderCourses.types';

@Module({
    namespaced: true,
    name: 'leadersCourses',
    store,
    dynamic: true,
})
class LeadersCoursesModule extends VuexModule {
    leadersCourses: ILeaderCourses[] = [];
    leadersCoursesLoaded = false;

    @MutationAction
    async fetchAll(): Promise<{ leadersCourses: ILeaderCourses[]; leadersCoursesLoaded: boolean }> {
        const leadersCourses = await store.$repository.leaderCourses.fetchAll();
        let leadersCoursesLoaded = false;
        if (leadersCourses) {
            leadersCoursesLoaded = true;
        }
        return { leadersCourses, leadersCoursesLoaded }
    }
}

export const LeadersCoursesStore = getModule(LeadersCoursesModule);

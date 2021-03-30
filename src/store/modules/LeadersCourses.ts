import {getModule, Module, Mutation, MutationAction, VuexModule} from 'vuex-module-decorators';
import store from '@/store';
import {ILeaderCourses, LeaderCoursesRequestType} from '@/entity/leaderCourses/leaderCourses.types';

@Module({
    namespaced: true,
    name: 'leadersCourses',
    store,
    dynamic: true,
})
class LeadersCoursesModule extends VuexModule {
    leadersCourses: ILeaderCourses[] = [];
    leadersCoursesLoaded = false;

    @Mutation
    clear(): void {
        this.leadersCourses = []
        this.leadersCoursesLoaded = false;
    }

    @MutationAction
    async fetchAll(data?: LeaderCoursesRequestType): Promise<{ leadersCourses: ILeaderCourses[]; leadersCoursesLoaded: boolean }> {
        const formData = new FormData();
        if(data) {
            if (data.name) {
                formData.append('name', data.name);
            }
            else formData.delete('name');
            if (data.courseLevelId) {
                formData.append('courseLevelId', data.courseLevelId.toString());
            }
            else formData.delete('courseLevelId');
            if (data.maxCost !== undefined) {
                formData.append('maxCost', data.maxCost.toString());
            }
            else formData.delete('maxCost');
            if (data.limit) {
                formData.append('limit', data.limit.toString());
            }
            else formData.delete('limit');
            if (data.minCost !== undefined) {
                formData.append('minCost', data.minCost.toString());
            }
            else formData.delete('minCost');
            if (data.skip) {
                formData.append('skip', data.skip.toString());
            }
            else formData.delete('skip');
            if (data.accountId) {
                formData.append('accountId', data.accountId.toString());
            }
            else formData.delete('accountId');
        }
        const leadersCourses = await store.$repository.leaderCourses.fetchAll(formData);
        let leadersCoursesLoaded = false;
        if (leadersCourses) {
            leadersCoursesLoaded = true;
        }
        return { leadersCourses, leadersCoursesLoaded }
    }
}

export const LeadersCoursesStore = getModule(LeadersCoursesModule);

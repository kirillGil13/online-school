import {getModule, Module, VuexModule} from 'vuex-module-decorators';
import store from '@/store';
import {LeaderCoursesResponseType} from '@/entity/leaderCourses/leaderCourses.types';

@Module({
    namespaced: true,
    name: 'leadersCoursesTest',
    store,
    dynamic: true,
})
class LeadersCoursesTestModule extends VuexModule {
    leadersCourses: LeaderCoursesResponseType[] = [
        {
            id: 0,
            title: 'Как закрыть 10 звезду в компании',
            cover: 'https://i.ytimg.com/vi/hBh_CC5y8-s/maxresdefault.jpg',
            totalLesson: 12,
            lessonPassed: 0,
            duration: 1250,
            rating: 10,
        },
        {
            id: 1,
            title: 'Как с помощью социальных сетей увеличить поток новых клиентов',
            cover: 'https://i.ytimg.com/vi/hBh_CC5y8-s/maxresdefault.jpg',
            totalLesson: 12,
            lessonPassed: 0,
            duration: 1250,
            rating: 10,
        },
        {
            id: 2,
            title: 'Как создавать международные команды?',
            cover: 'https://i.ytimg.com/vi/hBh_CC5y8-s/maxresdefault.jpg',
            totalLesson: 12,
            lessonPassed: 0,
            duration: 1250,
            rating: 10,
        },
        {
            id: 3,
            title: 'Как закрыть 10 звезду в компании',
            cover: 'https://i.ytimg.com/vi/hBh_CC5y8-s/maxresdefault.jpg',
            totalLesson: 12,
            lessonPassed: 0,
            duration: 1250,
            rating: 10,
        },

    ];
}

export const LeadersCoursesTestStore = getModule(LeadersCoursesTestModule);

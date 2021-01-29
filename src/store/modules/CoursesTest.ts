import {getModule, Module, VuexModule} from 'vuex-module-decorators';
import store from '@/store';
import {CoursesListItemResponseType} from '@/entity/courses/courses.types';

@Module({
    namespaced: true,
    name: 'coursesTest',
    store,
    dynamic: true,
})
class CoursesTestModule extends VuexModule {
    courses: CoursesListItemResponseType[] = [
        {
            id: 0,
            title: 'Как закрыть 10 звезду в компании',
            cover: 'https://foundr.com/wp-content/uploads/2016/05/88_create-course.jpg',
            totalLesson: 0,
            lessonPassed: 0,
            duration: 1250,
            rating: 10,
        },
        {
            id: 1,
            title: 'Как с помощью социальных сетей увеличить поток новых клиентов',
            cover: 'https://foundr.com/wp-content/uploads/2016/05/88_create-course.jpg',
            totalLesson: 0,
            lessonPassed: 0,
            duration: 1250,
            rating: 10,
        },
        {
            id: 2,
            title: 'Как создавать международные команды?',
            cover: 'https://foundr.com/wp-content/uploads/2016/05/88_create-course.jpg',
            totalLesson: 0,
            lessonPassed: 0,
            duration: 1250,
            rating: 10,
        },
        {
            id: 3,
            title: 'Как закрыть 10 звезду в компании',
            cover: 'https://foundr.com/wp-content/uploads/2016/05/88_create-course.jpg',
            totalLesson: 0,
            lessonPassed: 0,
            duration: 1250,
            rating: 10,
        },

    ];
}

export const CoursesTestStore = getModule(CoursesTestModule);

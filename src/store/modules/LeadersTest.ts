import {getModule, Module, VuexModule} from 'vuex-module-decorators';
import store from '@/store';
import {LeaderResponseType} from '@/entity/leader';

@Module({
    namespaced: true,
    name: 'leaderTest',
    store,
    dynamic: true,
})
class LeaderModule extends VuexModule {
    leader: LeaderResponseType[] = [
        {
            id: 0,
            direction: 'Мастер вовлечения',
            rating: '10',
            createdAt: '',
            updatedAt: '',
            userInfo: {
                id: 0,
                name: 'Ivan',
                surname: 'Ivanov',
                avatar:
                    'https://fiverr-res.cloudinary.com/images/q_auto,f_auto/gigs/136697800/original/ad0b0ec86b4d6cc39a8f2350c1979d0be2182691/do-youtube-banner-watermark-avatar-logo-for-your-channel.png',
            },
            courses: [
                {
                    id: 0,
                    title: 'Как закрыть 10 звезду в компании',
                    description: 'gjhgk',
                    isTestingRequire: true,
                    createdAt: '',
                },
            ],
            balance: '',
            totalCoursesViewsCount: 10,
        },
        {
            id: 1,
            direction: 'Мастер вовлечения',
            rating: '10',
            createdAt: '',
            updatedAt: '',
            userInfo: {
                id: 0,
                name: 'Ivan',
                surname: 'Sidorov',
                avatar:
                    'https://fiverr-res.cloudinary.com/images/q_auto,f_auto/gigs/136697800/original/ad0b0ec86b4d6cc39a8f2350c1979d0be2182691/do-youtube-banner-watermark-avatar-logo-for-your-channel.png',
            },
            courses: [
                {
                    id: 0,
                    title: 'Как закрыть 10 звезду в компании',
                    description: 'gjhgk',
                    isTestingRequire: true,
                    createdAt: '',
                },
            ],
            balance: '',
            totalCoursesViewsCount: 10,
        },
        {
            id: 2,
            direction: 'Мастер вовлечения',
            rating: '10',
            createdAt: '',
            updatedAt: '',
            userInfo: {
                id: 0,
                name: 'Ivan',
                surname: 'Sidorov',
                avatar:
                    'https://fiverr-res.cloudinary.com/images/q_auto,f_auto/gigs/136697800/original/ad0b0ec86b4d6cc39a8f2350c1979d0be2182691/do-youtube-banner-watermark-avatar-logo-for-your-channel.png',
            },
            courses: [
                {
                    id: 0,
                    title: 'Как закрыть 10 звезду в компании',
                    description: 'gjhgk',
                    isTestingRequire: true,
                    createdAt: '',
                },
            ],
            balance: '',
            totalCoursesViewsCount: 10,
        },
        {
            id: 3,
            direction: 'Мастер вовлечения',
            rating: '10',
            createdAt: '',
            updatedAt: '',
            userInfo: {
                id: 0,
                name: 'Ivan',
                surname: 'Sidorov',
                avatar:
                    'https://fiverr-res.cloudinary.com/images/q_auto,f_auto/gigs/136697800/original/ad0b0ec86b4d6cc39a8f2350c1979d0be2182691/do-youtube-banner-watermark-avatar-logo-for-your-channel.png',
            },
            courses: [
                {
                    id: 0,
                    title: 'Как закрыть 10 звезду в компании',
                    description: 'gjhgk',
                    isTestingRequire: true,
                    createdAt: '',
                },
            ],
            balance: '',
            totalCoursesViewsCount: 10,
        },
    ];
}

export const LeaderTestStore = getModule(LeaderModule);

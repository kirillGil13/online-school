import {Module, getModule, VuexModule, Mutation} from 'vuex-module-decorators';
import {ICompaniesListItem} from '@/entity/companies/companies.types';
import store from '@/store';

@Module({
    namespaced: true,
    name: 'companies',
    store,
    dynamic: true,
})
class Companies extends VuexModule {
    companies: ICompaniesListItem[] | null = null
    // на будущее
    // @MutationAction
    // async fetchPresentations(): Promise<{companies: ICompaniesListItem[]}> {
    //     const companies = await store.$repository.companies.fetch()
    //     return {companies}
    // }
    @Mutation
    fetchCompanies(): void {
        this.companies = [
            {
                id: 1,
                name: 'Finiko',
                avatar: 'https://yt3.ggpht.com/ytc/AAUvwnjozgjg3w68Eg6XOnQfRkO3m2WoQ6gZixMXHw5Jug=s900-c-k-c0x00ffffff-no-rj',
                description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Semper diam mollis vitae, fames. Nisi,' +
                    ' tristique sollicitudin integer et. Vitae egestas facilisi sem vestibulum, sed. ' +
                    'Faucibus sed euismod sollicitudin in diam consectetur.',
                leaders: [
                    {
                        id: 1,
                        direction: 'Мастер вовлечения',
                        rating: '9.9',
                        createdAt: '',
                        updatedAt: '',
                        userInfo:
                            {
                                id: 1,
                                name: 'Kadin',
                                surname: 'Lubin',
                                avatar: 'data:image/jpeg;base64,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',
                            },
                        courses: [{
                            id: 1,
                            title: 'asd',
                            description: 'asd',
                            isTestingRequire: false,
                            createdAt: '1123',
                        }],
                        balance: '123',
                        totalCoursesViewsCount: 123,
                        fullName: '',
                    },
                    {
                        id: 2,
                        direction: 'Мастер вовлечения',
                        rating: '9.9',
                        createdAt: '',
                        updatedAt: '',
                        userInfo:
                            {
                                id: 1,
                                name: 'Kadin',
                                surname: 'Lubin',
                                avatar: 'data:image/jpeg;base64,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',
                            },
                        courses: [{
                            id: 1,
                            title: 'asd',
                            description: 'asd',
                            isTestingRequire: false,
                            createdAt: '1123',
                        }],
                        balance: '123',
                        totalCoursesViewsCount: 123,
                        fullName: '',
                    },
                    {
                        id: 3,
                        direction: 'Мастер вовлечения',
                        rating: '9.9',
                        createdAt: '',
                        updatedAt: '',
                        userInfo:
                            {
                                id: 1,
                                name: 'Kadin',
                                surname: 'Lubin',
                                avatar: 'data:image/jpeg;base64,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',
                            },
                        courses: [{
                            id: 1,
                            title: 'asd',
                            description: 'asd',
                            isTestingRequire: false,
                            createdAt: '1123',
                        }],
                        balance: '123',
                        totalCoursesViewsCount: 123,
                        fullName: '',
                    },
                    {
                        id: 4,
                        direction: 'Мастер вовлечения',
                        rating: '9.9',
                        createdAt: '',
                        updatedAt: '',
                        userInfo:
                            {
                                id: 1,
                                name: 'Kadin',
                                surname: 'Lubin',
                                avatar: 'data:image/jpeg;base64,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',
                            },
                        courses: [{
                            id: 1,
                            title: 'asd',
                            description: 'asd',
                            isTestingRequire: false,
                            createdAt: '1123',
                        }],
                        balance: '123',
                        totalCoursesViewsCount: 123,
                        fullName: '',
                    },
                    {
                        id: 5,
                        direction: 'Мастер вовлечения',
                        rating: '9.9',
                        createdAt: '',
                        updatedAt: '',
                        userInfo:
                            {
                                id: 1,
                                name: 'Kadin',
                                surname: 'Lubin',
                                avatar: 'data:image/jpeg;base64,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',
                            },
                        courses: [{
                            id: 1,
                            title: 'asd',
                            description: 'asd',
                            isTestingRequire: false,
                            createdAt: '1123',
                        }],
                        balance: '123',
                        totalCoursesViewsCount: 123,
                        fullName: '',
                    },
                    {
                        id: 6,
                        direction: 'Мастер вовлечения',
                        rating: '9.9',
                        createdAt: '',
                        updatedAt: '',
                        userInfo:
                            {
                                id: 1,
                                name: 'Kadin',
                                surname: 'Lubin',
                                avatar: 'data:image/jpeg;base64,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',
                            },
                        courses: [{
                            id: 1,
                            title: 'asd',
                            description: 'asd',
                            isTestingRequire: false,
                            createdAt: '1123',
                        }],
                        balance: '123',
                        totalCoursesViewsCount: 123,
                        fullName: '',
                    },
                    {
                        id: 7,
                        direction: 'Мастер вовлечения',
                        rating: '9.9',
                        createdAt: '',
                        updatedAt: '',
                        userInfo:
                            {
                                id: 1,
                                name: 'Kadin',
                                surname: 'Lubin',
                                avatar: 'data:image/jpeg;base64,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',
                            },
                        courses: [{
                            id: 1,
                            title: 'asd',
                            description: 'asd',
                            isTestingRequire: false,
                            createdAt: '1123',
                        }],
                        balance: '123',
                        totalCoursesViewsCount: 123,
                        fullName: '',
                    },
                ],
                courses: [
                    {
                        id: 1,
                        title: 'Как закрыть 10 звезду в компании',
                        cover: 'https://www.oum.ru/upload/iblock/4a6/4a689562637ffe31a94e1770388395f8.jpg',
                        totalLesson: 1,
                        lessonPassed: 1,
                        duration: 1,
                        rating: 1,
                        progress: 50,
                        fullDuration(): string {
                            return '100'
                        }
                    },
                    {
                        id: 2,
                        title: 'Как закрыть 10 звезду в компании',
                        cover: 'https://www.oum.ru/upload/iblock/4a6/4a689562637ffe31a94e1770388395f8.jpg',
                        totalLesson: 1,
                        lessonPassed: 1,
                        duration: 1,
                        rating: 1,
                        progress: 50,
                        fullDuration(): string {
                            return '100'
                        }
                    },
                    {
                        id: 3,
                        title: 'Как закрыть 10 звезду в компании',
                        cover: 'https://www.oum.ru/upload/iblock/4a6/4a689562637ffe31a94e1770388395f8.jpg',
                        totalLesson: 1,
                        lessonPassed: 1,
                        duration: 1,
                        rating: 1,
                        progress: 50,
                        fullDuration(): string {
                            return '100'
                        }
                    },
                    {
                        id: 4,
                        title: 'Как закрыть 10 звезду в компании',
                        cover: 'https://www.oum.ru/upload/iblock/4a6/4a689562637ffe31a94e1770388395f8.jpg',
                        totalLesson: 1,
                        lessonPassed: 1,
                        duration: 1,
                        rating: 1,
                        progress: 50,
                        fullDuration(): string {
                            return '100'
                        }
                    },
                ],
            },
            {
                id: 2,
                name: 'Vexel Online',
                avatar: 'https://vexel.is/img/vexel-logo.png',
                description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Semper diam mollis vitae, fames. Nisi, tristique ' +
                    'sollicitudin integer et. Vitae egestas facilisi sem vestibulum, sed. Faucibus sed euismod sollicitudin in diam consectetur.',
                leaders: [
                    {
                        id: 1,
                        direction: 'Мастер вовлечения',
                        rating: '9.9',
                        createdAt: '',
                        updatedAt: '',
                        userInfo:
                            {
                                id: 1,
                                name: 'Madelyn',
                                surname: 'Calzoni',
                                avatar: 'https://meragor.com/files/styles//ava_800_800_wm/sfztn_boy_avatar_12.jpg',
                            },
                        courses: [{
                            id: 1,
                            title: 'asd',
                            description: 'asd',
                            isTestingRequire: false,
                            createdAt: '1123',
                        }],
                        balance: '123',
                        totalCoursesViewsCount: 123,
                        fullName: '',
                    },
                    {
                        id: 2,
                        direction: 'Мастер вовлечения',
                        rating: '9.9',
                        createdAt: '',
                        updatedAt: '',
                        userInfo:
                            {
                                id: 1,
                                name: 'Madelyn',
                                surname: 'Calzoni',
                                avatar: 'https://meragor.com/files/styles//ava_800_800_wm/sfztn_boy_avatar_12.jpg',
                            },
                        courses: [{
                            id: 1,
                            title: 'asd',
                            description: 'asd',
                            isTestingRequire: false,
                            createdAt: '1123',
                        }],
                        balance: '123',
                        totalCoursesViewsCount: 123,
                        fullName: '',
                    },
                    {
                        id: 3,
                        direction: 'Мастер вовлечения',
                        rating: '9.9',
                        createdAt: '',
                        updatedAt: '',
                        userInfo:
                            {
                                id: 1,
                                name: 'Madelyn',
                                surname: 'Calzoni',
                                avatar: 'https://meragor.com/files/styles//ava_800_800_wm/sfztn_boy_avatar_12.jpg',
                            },
                        courses: [{
                            id: 1,
                            title: 'asd',
                            description: 'asd',
                            isTestingRequire: false,
                            createdAt: '1123',
                        }],
                        balance: '123',
                        totalCoursesViewsCount: 123,
                        fullName: '',
                    },
                    {
                        id: 4,
                        direction: 'Мастер вовлечения',
                        rating: '9.9',
                        createdAt: '',
                        updatedAt: '',
                        userInfo:
                            {
                                id: 1,
                                name: 'Madelyn',
                                surname: 'Calzoni',
                                avatar: 'https://meragor.com/files/styles//ava_800_800_wm/sfztn_boy_avatar_12.jpg',
                            },
                        courses: [{
                            id: 1,
                            title: 'asd',
                            description: 'asd',
                            isTestingRequire: false,
                            createdAt: '1123',
                        }],
                        balance: '123',
                        totalCoursesViewsCount: 123,
                        fullName: '',
                    },
                    {
                        id: 5,
                        direction: 'Мастер вовлечения',
                        rating: '9.9',
                        createdAt: '',
                        updatedAt: '',
                        userInfo:
                            {
                                id: 1,
                                name: 'Madelyn',
                                surname: 'Calzoni',
                                avatar: 'https://meragor.com/files/styles//ava_800_800_wm/sfztn_boy_avatar_12.jpg',
                            },
                        courses: [{
                            id: 1,
                            title: 'asd',
                            description: 'asd',
                            isTestingRequire: false,
                            createdAt: '1123',
                        }],
                        balance: '123',
                        totalCoursesViewsCount: 123,
                        fullName: '',
                    },
                    {
                        id: 6,
                        direction: 'Мастер вовлечения',
                        rating: '9.9',
                        createdAt: '',
                        updatedAt: '',
                        userInfo:
                            {
                                id: 1,
                                name: 'Madelyn',
                                surname: 'Calzoni',
                                avatar: 'https://meragor.com/files/styles//ava_800_800_wm/sfztn_boy_avatar_12.jpg',
                            },
                        courses: [{
                            id: 1,
                            title: 'asd',
                            description: 'asd',
                            isTestingRequire: false,
                            createdAt: '1123',
                        }],
                        balance: '123',
                        totalCoursesViewsCount: 123,
                        fullName: '',
                    },
                    {
                        id: 7,
                        direction: 'Мастер вовлечения',
                        rating: '9.9',
                        createdAt: '',
                        updatedAt: '',
                        userInfo:
                            {
                                id: 1,
                                name: 'Madelyn',
                                surname: 'Calzoni',
                                avatar: 'https://meragor.com/files/styles//ava_800_800_wm/sfztn_boy_avatar_12.jpg',
                            },
                        courses: [{
                            id: 1,
                            title: 'asd',
                            description: 'asd',
                            isTestingRequire: false,
                            createdAt: '1123',
                        }],
                        balance: '123',
                        totalCoursesViewsCount: 123,
                        fullName: '',
                    },
                ],
                courses: [
                    {
                        id: 1,
                        title: 'Как закрыть 10 звезду в компании',
                        cover: 'https://www.oum.ru/upload/iblock/4a6/4a689562637ffe31a94e1770388395f8.jpg',
                        totalLesson: 1,
                        lessonPassed: 1,
                        duration: 1,
                        rating: 1,
                        progress: 50,
                        fullDuration(): string {
                            return '100'
                        }
                    },
                ],
            }
        ]
    }

}

export const CompaniesStore = getModule(Companies)

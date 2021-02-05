import {getModule, Module, MutationAction, VuexModule} from 'vuex-module-decorators';
import store from '@/store';
import {TestingFormRequestType, TestingFormResponseType} from '@/form/testing/testingForm.types';

@Module({
    namespaced: true,
    name: 'rightAnswers',
    store,
    dynamic: true,
})
class RightAnswersModule extends VuexModule {
    rightAnswers: TestingFormResponseType | null = null;
    answersLoaded = false;

    @MutationAction
    async postAnswers(data: {answers: TestingFormRequestType[]; param: string}): Promise<{rightAnswers: TestingFormResponseType; answersLoaded: boolean}> {
        const rightAnswers = await store.$repository.rightAnswers.postAnswers(data.answers,data.param);
        let answersLoaded = false;
        if (rightAnswers) {
            answersLoaded = true;
        }
        return { rightAnswers, answersLoaded};
    }
}

export const RightAnswersStore = getModule(RightAnswersModule);

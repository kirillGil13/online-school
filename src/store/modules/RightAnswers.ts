import {getModule, Module, MutationAction, VuexModule} from 'vuex-module-decorators';
import store from '@/store';
import {TestingFormRequestType} from '@/form/testing/testingForm.types';
import {ITestingResult} from '@/entity/testingResult/testingResult.types';

@Module({
    namespaced: true,
    name: 'rightAnswers',
    store,
    dynamic: true,
})
class RightAnswersModule extends VuexModule {
    rightAnswers: ITestingResult | null = null;
    answersLoaded = false;

    @MutationAction
    async postAnswers(data: {answers: TestingFormRequestType[]; param: string}): Promise<{rightAnswers: ITestingResult; answersLoaded: boolean}> {
        const rightAnswers = await store.$repository.rightAnswers.postAnswers(data.answers,data.param);
        let answersLoaded = false;
        if (rightAnswers) {
            answersLoaded = true;
        }
        return { rightAnswers, answersLoaded};
    }
    @MutationAction
    async fetchAll(param: number): Promise<{rightAnswers: ITestingResult; answersLoaded: boolean}> {
        const rightAnswers = await store.$repository.rightAnswers.fetchAll(param.toString());
        let answersLoaded = false;
        if (rightAnswers) {
            answersLoaded = true;
        }
        return { rightAnswers, answersLoaded};
    }

}

export const RightAnswersStore = getModule(RightAnswersModule);

import {Action, getModule, Module, MutationAction, VuexModule} from 'vuex-module-decorators';
import store from '@/store';
import {TestingFormRequestType} from '@/form/testing/testingForm.types';
import {ITestingResult} from '@/entity/testingResult/testingResult.types';
import {FreeTestRequestType} from '@/form/freeTest/freeTestForm.types';
import {ITestingFree} from '@/entity/testingFree/testingFree.types';

@Module({
    namespaced: true,
    name: 'rightAnswers',
    store,
    dynamic: true,
})
class RightAnswersModule extends VuexModule {
    rightAnswers: ITestingResult | null = null;
    answerFree: ITestingFree | null = null;
    answerFreeLoaded = false;
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

    @Action({rawError: true})
    async postFreeAnswer(data: {data: FreeTestRequestType; route: string}): Promise<boolean> {
        const rightAnswers = await store.$repository.rightAnswers.postFreeAnswer(data.data,data.route);
        return rightAnswers;
    }

    @MutationAction
    async fetchAll(param: number): Promise<{rightAnswers: ITestingResult; answersLoaded: boolean}> {
        console.log(2);
        const rightAnswers = await store.$repository.rightAnswers.fetchAll(param.toString());
        let answersLoaded = false;
        if (rightAnswers) {
            answersLoaded = true;
        }
        return { rightAnswers, answersLoaded};
    }

    @MutationAction
    async fetchFreeResult(param: number): Promise<{answerFree: ITestingFree; answerFreeLoaded: boolean}> {
        const answerFree = await store.$repository.rightAnswers.fetchFreeResult(param.toString());
        let answerFreeLoaded = false;
        if (answerFree) {
            answerFreeLoaded = true;
        }
        return { answerFree, answerFreeLoaded};
    }

}

export const RightAnswersStore = getModule(RightAnswersModule);

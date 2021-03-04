import {getModule, Module, MutationAction, VuexModule} from 'vuex-module-decorators';
import store from '@/store';
import {ITesting} from '@/entity/testing/testing.types';

@Module({
    namespaced: true,
    name: 'questions',
    store,
    dynamic: true,
})
class QuestionsModule extends VuexModule {
    questions: ITesting | null = null;
    questionsLoaded = false;

    @MutationAction
    async fetchAll(homeworkId: string): Promise<{ questions: ITesting; questionsLoaded: boolean }> {
        const questions = await store.$repository.questions.fetchAll(homeworkId);
        let questionsLoaded = false;
        if (questions) {
            questionsLoaded = true;
        }
        return {questions, questionsLoaded};
    }
}

export const QuestionsStore = getModule(QuestionsModule);

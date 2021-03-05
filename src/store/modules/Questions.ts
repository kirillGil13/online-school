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
    async fetchAll(homeworkId: number | null): Promise<{ questions: ITesting | null; questionsLoaded: boolean }> {
        this.questionsLoaded = false;
        if (homeworkId) {
            const questions = await store.$repository.questions.fetchAll(homeworkId.toString());
            let questionsLoaded = false;
            if (questions) {
                questionsLoaded = true;
            }
            return {questions, questionsLoaded};
        } else return {questions: null, questionsLoaded: false};
    }
}

export const QuestionsStore = getModule(QuestionsModule);

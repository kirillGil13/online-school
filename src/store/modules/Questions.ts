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
        if (homeworkId !== null) {
            console.log(homeworkId);
            const questions = await store.$repository.questions.fetchAll(homeworkId.toString());
            let questionsLoaded = false;
            if (questions) {
                questionsLoaded = true;
            }
            return {questions, questionsLoaded};
        } else {
            const questions = null;
            const questionsLoaded = false;
            return {questions, questionsLoaded};
        }
    }
}

export const QuestionsStore = getModule(QuestionsModule);

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
    questions: ITesting[] = [];
    questionsLoaded = false;

    @MutationAction
    async fetchAll(lessonId: string): Promise<{ questions: ITesting[]; questionsLoaded: boolean }> {
        const questions = await store.$repository.questions.fetchAll(lessonId);
        let questionsLoaded = false;
        if (questions.length !== 0) {
            questionsLoaded = true;
        }
        return {questions, questionsLoaded};
    }
}

export const QuestionsStore = getModule(QuestionsModule);

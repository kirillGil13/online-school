import { getModule, Module, MutationAction, VuexModule } from 'vuex-module-decorators';
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

    @MutationAction
    async fetchAll(lessonId: string): Promise<{ questions: ITesting[] }> {
        const questions = await store.$repository.questions.fetchAll(lessonId);
        return { questions };
    }
}

export const QuestionsStore = getModule(QuestionsModule);

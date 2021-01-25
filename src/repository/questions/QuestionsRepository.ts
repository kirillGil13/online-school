import Api from '@/repository/api';
import {IQuestionsItemRepository} from '@/repository/questions/QuestionsRepository.types';
import {ITesting, TestingResponseType} from '@/entity/testing/testing.types';
import Testing from '@/entity/testing/testing';

export class QuestionsRepository implements IQuestionsItemRepository {
    async fetchAll(lessonId: string): Promise<ITesting[]> {
        const response = await Api.get(`/lessons/${lessonId}/questions`);
        const data = response.data as TestingResponseType[];
        return data.map((questions: TestingResponseType) => new Testing(questions));
    }
}

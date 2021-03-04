import Api from '@/repository/api';
import {IQuestionsItemRepository} from '@/repository/questions/QuestionsRepository.types';
import {ITesting, TestingResponseType} from '@/entity/testing/testing.types';
import Testing from '@/entity/testing/testing';

export class QuestionsRepository implements IQuestionsItemRepository {
    async fetchAll(homeworkId: string): Promise<ITesting> {
        const response = await Api.get(`/homeworks/${homeworkId}`);
        const data = response.data as TestingResponseType;
        return new Testing(data);
    }
}

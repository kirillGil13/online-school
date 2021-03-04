import {ITesting} from '@/entity/testing/testing.types';

export interface IQuestionsItemRepository {
    fetchAll(homeworkId: string): Promise<ITesting>;
}

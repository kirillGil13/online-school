import {ITesting} from '@/entity/testing/testing.types';

export interface IQuestionsItemRepository {
    fetchAll(lessonId: string): Promise<ITesting[]>;
}

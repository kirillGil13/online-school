import Api from '@/repository/api';
import {IRightAnswersRepository} from '@/repository/rightAnswers/RightAnswers.types';
import {TestingFormRequestType, TestingFormResponseType} from '@/form/testing/testingForm.types';

export class RightAnswersRepository implements IRightAnswersRepository {
    async postAnswers(answers: TestingFormRequestType[], param: string): Promise<TestingFormResponseType> {
        const response = await Api.post(`/lessons/${param}/testing-results`, answers);
        const data = response.data as TestingFormResponseType;
        return data;
    }
}
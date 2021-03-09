import Api from '@/repository/api';
import {IRightAnswersRepository} from '@/repository/rightAnswers/RightAnswers.types';
import {TestingFormRequestType} from '@/form/testing/testingForm.types';
import {ITestingResult, TestingResultResponseType} from '@/entity/testingResult/testingResult.types';
import TestingResult from '@/entity/testingResult/testingResult';

export class RightAnswersRepository implements IRightAnswersRepository {
    async postAnswers(answers: TestingFormRequestType[], param: string): Promise<ITestingResult> {
        const response = await Api.post(`/answers/test/homeworks/${param}`, answers);
        const data = response.data as TestingResultResponseType;
        return new TestingResult(data);
    }
    async fetchAll(param: string): Promise<ITestingResult> {
        const response = await Api.get(`/answers/test/homeworks/${param}`);
        const data = response.data as TestingResultResponseType;
        return new TestingResult(data);
    }
}
import Api from '@/repository/api';
import {IRightAnswersRepository} from '@/repository/rightAnswers/RightAnswers.types';
import {TestingFormRequestType} from '@/form/testing/testingForm.types';
import {ITestingResult, TestingResultResponseType} from '@/entity/testingResult/testingResult.types';
import TestingResult from '@/entity/testingResult/testingResult';
import {FreeTestRequestType} from '@/form/freeTest/freeTestForm.types';
import {ITestingFree, TestingFreeResponseType} from '@/entity/testingFree/testingFree.types';
import TestingFree from '@/entity/testingFree/testingFree';

export class RightAnswersRepository implements IRightAnswersRepository {
    async postAnswers(answers: TestingFormRequestType[], param: string): Promise<ITestingResult> {
        const response = await Api.post(`/answers/test/homeworks/${param}`, answers);
        const data = response.data as TestingResultResponseType;
        return new TestingResult(data);
    }
    async postFreeAnswer(data: FreeTestRequestType, route: string): Promise<boolean> {
        const response = await Api.post(`/answers/free/homeworks/${route}`, data);
        const responseData = response.data;
        return responseData.result;
    }
    async fetchAll(param: string): Promise<ITestingResult> {
        const response = await Api.get(`/answers/test/homeworks/${param}`);
        const data = response.data as TestingResultResponseType;
        return new TestingResult(data);
    }

    async fetchFreeResult(param: string): Promise<ITestingFree> {
        const response = await Api.get(`/answers/free/homeworks/${param}`);
        const data = response.data as TestingFreeResponseType;
        return new TestingFree(data);
    }
}

import {TestingFormRequestType, TestingFormResponseType} from '@/form/testing/testingForm.types';

export interface IRightAnswersRepository {
    postAnswers(answers: TestingFormRequestType[], param: string): Promise<TestingFormResponseType>;
}
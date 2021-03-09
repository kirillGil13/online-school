import {TestingFormRequestType} from '@/form/testing/testingForm.types';
import {ITestingResult} from '@/entity/testingResult/testingResult.types';

export interface IRightAnswersRepository {
    postAnswers(answers: TestingFormRequestType[], param: string): Promise<ITestingResult>;
    fetchAll(param: string): Promise<ITestingResult>;
}
import {TestingFormRequestType} from '@/form/testing/testingForm.types';
import {ITestingResult} from '@/entity/testingResult/testingResult.types';
import {FreeTestRequestType} from '@/form/freeTest/freeTestForm.types';
import {ITestingFree} from '@/entity/testingFree/testingFree.types';

export interface IRightAnswersRepository {
    postAnswers(answers: TestingFormRequestType[], param: string): Promise<ITestingResult>;
    postFreeAnswer(data: FreeTestRequestType, route: string): Promise<boolean>;
    fetchAll(param: string): Promise<ITestingResult>;
    fetchFreeResult(param: string): Promise<ITestingFree>
}

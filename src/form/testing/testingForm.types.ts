import {ITestingQuestions} from '@/entity/testing/testing.types';

export interface ITestingForm {
    questions: ITestingQuestions[];
    results: TestingFormRequestType[];
    activeStep: ITestingFormActiveStep[];
}
export interface ITestingFormActiveStep {
    questionId: number;
    active: boolean;
}
export type TestingFormRequestType = {
    questionId: number;
    testVariantId?: number | null;
}
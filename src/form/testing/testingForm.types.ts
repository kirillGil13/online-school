import { ITesting } from '@/entity/testing/testing.types';

export interface ITestingForm {
    questions: ITesting[];
    results: TestingFormRequestType[];
    activeStep: ITestingFormActiveStep[];
}
export interface ITestingFormActiveStep {
    questionId: number;
    active: boolean;
}
export type TestingFormRequestType = {
    questionId: number;
    answerId?: number | null;
}
export type TestingFormResponseType = {
    totalRightAnswers: number;
}
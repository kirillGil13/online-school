import { ITesting } from '@/entity/testing/testing.types';

export interface ITestingForm {
    questions: ITesting[];
    results: TestingFormRequestType[];
}
export type TestingFormRequestType = {
    questionId: number;
    answerId?: number | null;
}
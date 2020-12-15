import { ITesting } from '@/entity/testing/testing.types';

export interface ITestingForm {
    questions: ITesting[];
    results: TestingFormRequestType[];
    valid(step: number): boolean;
    send(): void;
}
export type TestingFormRequestType = {
    questionId: number;
    answerId?: number | null;
}
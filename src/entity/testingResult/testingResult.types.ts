export interface ITestingResult {
    isDone: boolean;
    totalAnswers: number;
    rightAnswers: number;
    percent: number;
    result: string;
}
export type TestingResultResponseType = {
    is_done: boolean;
    total_answers: number;
    right_answers: number;
    percent: number;
    result: string;
}
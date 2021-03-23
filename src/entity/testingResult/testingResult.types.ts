export interface ITestingResult {
    editedAt: number;
    isDone: boolean;
    totalAnswers: number;
    rightAnswers: number;
    percent: number;
    result: string;
    handleTime(sec: number): number;
}
export type TestingResultResponseType = {
    editedAt: number;
    is_done: boolean;
    total_answers: number;
    right_answers: number;
    percent: number;
    result: string;
}

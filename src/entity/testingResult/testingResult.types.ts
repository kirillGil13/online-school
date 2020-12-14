export interface ITestingResult {
    questionLength: number;
    totalRightAnswers: number;
    progress: number;
}
export type TestingResultResponseType = {
    totalRightAnswers: number;
}
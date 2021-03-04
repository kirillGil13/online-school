export interface ITesting {
    id: number;
    homeworkType: string;
    lessonId: number;
    question: string;
    tests: ITestingQuestions[];
}
export interface ITestingQuestions {
    id: number;
    question: string;
    variants: ITestingAnswers[];
}
export interface ITestingAnswers{
    id: number;
    answer: string;
    isRight: boolean;
}
export type TestingResponseType = {
    id: number;
    homeworkType: string;
    lessonId: number;
    question: string;
    tests: TestingQuestionsResponseType[];
}
export type TestingQuestionsResponseType = {
    question: string;
    id: number;
    variants: TestingAnswersResponseType[];
}
export type TestingAnswersResponseType = {
    id: number;
    answer: string;
    isRight: boolean;
}
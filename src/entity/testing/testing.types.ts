export interface ITesting {
    id: number;
    homeworkType: string;
    lessonId: number;
    question: string | null;
    tests: ITestingQuestions[] | null;
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
    tests: TestingQuestionsResponseType[] | null;
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

export interface ITesting {
    id: number;
    question: string;
    answers: ITestingAnswers[];
}
export interface ITestingAnswers {
    id: number;
    answerOption: string;
}
export type TestingResponseType = {
    id: number;
    question: string;
    answers: TestingAnswersResponseType[];
}
export type TestingAnswersResponseType = {
    id: number;
    answerOption: string;
}

export type TestingRequestType = {
    questionId: number;
    answerId: number;
}
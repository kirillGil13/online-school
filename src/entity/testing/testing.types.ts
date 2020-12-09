export interface ITesting {
    id: number,
    question: string,
    answers: ITestingAnswers[]
}
export interface ITestingAnswers {
    id: number,
    answerOption: string
}
export type ITestingResponseType = {
    id: number,
    question: string,
    answers: ITestingAnswersResponseType[]
}
export type ITestingAnswersResponseType = {
    id: number,
    answerOption: string
}

export type ITestingRequestType = {
    question_id: number;
    answer_id: number;
}
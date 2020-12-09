import { ITesting, ITestingAnswers, ITestingResponseType } from "./testing.types";

export default class Testing implements ITesting{
    id: number;
    question: string;
    answers: ITestingAnswers[]
    constructor(data: ITestingResponseType) {
        this.id = data.id;
        this.question = data.question;
        this.answers = data.answers;
    }
}
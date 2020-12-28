import { ITesting, ITestingAnswers, TestingResponseType } from "./testing.types";

export default class Testing implements ITesting{
    id: number;
    question: string;
    answers: ITestingAnswers[] = []
    constructor(data: TestingResponseType) {
        this.id = data.id;
        this.question = data.question;
        for(let i = 0; i < data.answers.length; i++) {
            this.answers.push(data.answers[i]);
        }
    }
}

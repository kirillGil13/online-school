import { ITesting, ITestingAnswers, ITestingResponseType } from "./testing.types";

export default class Testing implements ITesting{
    id: number;
    question: string;
    answers: ITestingAnswers[] = []
    constructor(data: ITestingResponseType) {
        this.id = data.id;
        this.question = data.question;
        for(let i = 0; i < data.answers.length; i++) {
            this.answers.push(data.answers[i]);
        }
    }
}

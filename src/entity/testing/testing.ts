import {ITesting, ITestingQuestions, TestingResponseType} from './testing.types';

export default class Testing implements ITesting{
    id: number;
    homeworkType: string;
    lessonId: number;
    question: string;
    tests: ITestingQuestions[] = [];
    constructor(data: TestingResponseType) {
        this.id = data.id;
        this.question = data.question;
        this.homeworkType = data.homeworkType;
        this.lessonId = data.lessonId;
        for(let i = 0; i < data.tests.length; i++) {
            this.tests.push(data.tests[i]);
        }
    }
}

import Testing from '@/entity/testing/testing';
import { ITesting } from '@/entity/testing/testing.types';
import { ITestingForm, TestingFormRequestType } from './testingForm.types';

export class TestingForm implements ITestingForm {
    questions: ITesting[] = [];
    results: TestingFormRequestType[] = [];
    constructor(data: Testing[]) {
        for(let i = 0; i < data.length; i++) {
            this.questions.push({id: data[i].id, question: data[i].question, answers: data[i].answers});
            this.results.push({questionId: data[i].id, answerId: null});
        }
    }
    valid(step: number): boolean {
       const answer = this.results.find(item => item.questionId === step - 1 && item.answerId != null)
       if(answer) {
           return true;
       }
       else return false;
    }
    send() {
        //todo send to server
        console.log(1);
    }
}
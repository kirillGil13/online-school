import {ITestingQuestions} from '@/entity/testing/testing.types';
import {ITestingForm, ITestingFormActiveStep, TestingFormRequestType} from './testingForm.types';

export class TestingForm implements ITestingForm {
    questions: ITestingQuestions[] = [];
    results: TestingFormRequestType[] = [];
    activeStep: ITestingFormActiveStep[] = [];

    constructor(data: ITestingQuestions[]) {
        for (let i = 0; i < data.length; i++) {
            this.questions.push({id: data[i].id, question: data[i].question, variants: data[i].variants});
            this.results.push({questionId: data[i].id, answerId: null});
            this.activeStep.push({questionId: data[i].id, active: false});
        }
    }

    valid(step: number): boolean {
        const answer = this.results[step - 1] && this.results[step - 1].answerId != null;
        if (answer) {
            return true;
        } else return false;
    }

    send(): void {
        //todo send to server
        console.log(1);
    }
}

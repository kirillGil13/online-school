import Testing from '../testing/testing';
import { TestingResultComponentsEnum } from '../testingResultComponents/testingResultComponents.types';
import { ITestingResult, TestingResultResponseType } from './testingResult.types';

export default class TestingResult implements ITestingResult {
    questionLength: number;
    totalRightAnswers: number;
    testingResult!: TestingResultComponentsEnum;
    constructor(questions: Testing[], data: TestingResultResponseType) {
        this.questionLength = questions.length;
        this.totalRightAnswers = data.totalRightAnswers;
    }
    get progress() {
        return this.totalRightAnswers * 100 / this.questionLength;
    }
    result(): string {
        if(this.progress <= 75 && this.progress > 20) {
            return TestingResultComponentsEnum.PROCEED;
        }
        else if(this.progress <= 20) {
            return TestingResultComponentsEnum.FAIL;
        }
        else {
            return TestingResultComponentsEnum .SUCCESS;
        }
    } 
}
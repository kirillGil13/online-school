import { TestingResultComponentsEnum } from '../common/testingResultComponents.types';
import { ITestingResult, TestingResultResponseType } from './testingResult.types';

export default class TestingResult implements ITestingResult {
    isDone: boolean;
    totalAnswers: number;
    rightAnswers: number;
    percent: number;
    result: string;
    testingResult!: TestingResultComponentsEnum;
    constructor(data: TestingResultResponseType) {
        this.isDone = data.is_done;
        this.totalAnswers = data.total_answers;
        this.rightAnswers = data.right_answers;
        this.percent = data.percent;
        this.result = data.result;
    }

}

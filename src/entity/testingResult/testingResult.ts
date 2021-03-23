import { TestingResultComponentsEnum } from '../common/testingResultComponents.types';
import { ITestingResult, TestingResultResponseType } from './testingResult.types';

export default class TestingResult implements ITestingResult {
    editedAt: number;
    isDone: boolean;
    totalAnswers: number;
    rightAnswers: number;
    percent: number;
    result: string;
    testingResult!: TestingResultComponentsEnum;
    constructor(data: TestingResultResponseType) {
        this.editedAt = data.editedAt;
        this.isDone = data.is_done;
        this.totalAnswers = data.total_answers;
        this.rightAnswers = data.right_answers;
        this.percent = data.percent;
        this.result = data.result;
    }

    handleTime(sec: number): number {
        const current: number = (new Date()).getTime() / 1000 - this.editedAt;
        const time =  Math.floor(sec - current);
        if (time < 0) {
            return 0;
        } else return time;
    }
}

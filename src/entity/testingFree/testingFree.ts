import {ITestingFree, TestingFreeResponseType} from '@/entity/testingFree/testingFree.types';

export default class TestingFree implements ITestingFree {
    id: number;
    homeworkId: number;
    answer: string;

    constructor(data: TestingFreeResponseType) {
        this.id = data.id;
        this.homeworkId = data.homework_id;
        this.answer = data.answer;
    }
}

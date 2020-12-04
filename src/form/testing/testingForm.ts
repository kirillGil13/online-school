import { required } from '@rxweb/reactive-forms';
import { ITestingForm } from './testingForm.types';

export class TestingForm implements ITestingForm {
    question = '';

    @required()
    answer!: string;
}
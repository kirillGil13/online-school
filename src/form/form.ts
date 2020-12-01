import { IForm } from './form.types';

export abstract class Form implements IForm {
    abstract getValidators(): any;
}
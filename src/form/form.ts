import { IForm, ValidationError } from './form.types';

export abstract class Form implements IForm {

    errors: Array<ValidationError> = [];

    abstract validate(): boolean;

    getErrors(): Array<ValidationError> {
        return this.errors;
    }
}
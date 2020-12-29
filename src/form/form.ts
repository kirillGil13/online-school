import { IForm, RequestType } from '@/form/form.types';
import { Vue } from 'vue-property-decorator';

export abstract class Form extends Vue implements IForm {
    serverErrors: { [property: string]: string[] } = {};

    setErrors(propertyPath: string, title: string): void {
        this.serverErrors[propertyPath] = [title];
    }

    getErrors(property: string): string[] {
        return this.serverErrors[property] ?? [];
    }

    clearErrors(): void {
        this.serverErrors = {};
    }

    abstract getFormData(): RequestType;
}

import { IForm, RequestType } from '@/form/form.types';
import { Vue } from 'vue-property-decorator';

export abstract class Form extends Vue implements IForm {
    private sendingRequest = false;

    serverErrors: { [property: string]: string[] } = {};

    setErrors(propertyPath: string, title: string): void {
        this.$set(this.serverErrors, propertyPath, [title]);
    }

    getErrors(property: string): string[] {
        return this.serverErrors[property] ?? [];
    }

    clearErrors(): void {
        this.serverErrors = {};
    }

    getMessages(field: string): { [key: string]: string } {
        // @ts-ignore
        const messages = this.$options.__messages[field];

        const result: { [key: string]: string } = {};
        for (const validator in messages) {
            if (messages.hasOwnProperty(validator)) {
                result[validator] =
                    typeof messages[validator] === 'function' ? messages[validator](this) : messages[validator];
            }
        }

        return result;
    }

    getFormData(): RequestType {
        return {};
    }

    get disabled(): boolean {
        return this.$v.$invalid || this.sendingRequest;
    }

    private startRequest(): void {
        this.sendingRequest = true;
    }

    private stopRequest(): void {
        this.sendingRequest = false;
    }

    async submit(callback: CallableFunction): Promise<boolean> {
        try {
            this.startRequest();
            await callback(this.getFormData());
            return true;
        } catch (e) {
            console.log(e);
            return false;
        } finally {
            this.stopRequest();
        }
    }
}

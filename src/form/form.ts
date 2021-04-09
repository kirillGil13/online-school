import { IForm, RequestType } from '@/form/form.types';
import { Vue } from 'vue-property-decorator';

export abstract class Form extends Vue implements IForm {
    public sendingRequest = false;
    status = 0;

    serverErrors: { [property: string]: string[] } = {};

    setErrors(propertyPath: string, title: string): void {
        this.$set(this.serverErrors, propertyPath, [title]);
    }

    getErrors(property: string): string[] {
        return this.serverErrors[property] ?? [];
    }

    clearErrors(): void {
        this.serverErrors = {};
        this.status = 0;
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

    async submit(callback: CallableFunction, route?: string): Promise<boolean> {
        try {
            this.startRequest();
            if (route) {
                await callback({data: this.getFormData(), route: route});
            } else await callback(this.getFormData());
            return true;
        } catch (e) {
            if (e.response.status === 400 || e.response.status === 401 || e.response.status === 500) {
                this.status = e.response.status;
                this.setErrors('0', e.response.data.detail);
            }
            return false;
        } finally {
            this.stopRequest();
        }
    }
}

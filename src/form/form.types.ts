export interface IForm {
    serverErrors: { [key: string]: string[] };

    getFormData(): RequestType;

    setErrors(propertyPath: string, title: string): void;

    getErrors(property: string): string[];

    clearErrors(): void;
}

export type RequestType = {};

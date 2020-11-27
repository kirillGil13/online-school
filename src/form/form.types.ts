export interface IForm {
    validate(): boolean;
}
export type ValidationError = {
    key: string;
    message: string;
}

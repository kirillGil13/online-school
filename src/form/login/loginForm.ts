import { digit, maxLength, minLength, required, startsWith } from '@rxweb/reactive-forms';
import { ILoginForm, LoginRequestType } from "./loginForm.types";

export class LoginForm implements ILoginForm {

    countryCode = '+7';

    @required()
    @startsWith({value:'9'})
    @digit()
    @minLength({value: 10})
    @maxLength({value: 10})
    phone!: string;

    get fullPhone(): string {
        return this.countryCode + this.phone;
    }

    get request(): LoginRequestType {
        return {
            phone: this.fullPhone
        }
    }
}
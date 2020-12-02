import { digit, maxLength, minLength, required, startsWith } from '@rxweb/reactive-forms';
import { ILoginForm } from "./loginForm.types";

export class LoginForm implements ILoginForm {

    isSecondStep = false;
    countryCode = '+7';

    @required()
    @startsWith({value:'9'})
    @digit()
    @minLength({value: 10})
    @maxLength({value: 10})
    phone!: string;
}
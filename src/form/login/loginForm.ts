import { digit, maxLength, minLength, required, startsWith } from '@rxweb/reactive-forms';
import { ILoginForm } from "./loginForm.types";

export class LoginForm implements ILoginForm {

    private _phone = '';
    countryCode = '+7';
    btnText = 'Продолжить';

    get phone(): string{
        return this._phone;
    }

    @required()
    @startsWith({value:'9'})
    @digit()
    @minLength({value: 10})
    @maxLength({value: 10})
    set phone(value: string){
        this._phone = value;
    }
}
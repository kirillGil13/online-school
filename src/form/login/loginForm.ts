import { maxLength, minLength, pattern, required } from '@rxweb/reactive-forms';
import { Form } from "../form";
import { ILoginForm } from "./loginForm.types";

export class LoginForm extends Form implements ILoginForm {
    //@pattern({expression: {pincode: / (^\+?[\d\W-/]{4,16}$)/}, message: 'fsgdfgdfg'})
    @required({message: 'Это поле обязательно'})
    phone = "+7";

    isPhoneTouched = false;
    getValidators(){
        return this.phone;
    }

}
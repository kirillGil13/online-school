import { Watch, Vue } from 'vue-property-decorator';
import { Form } from "../form";
import { ValidationError } from "../form.types";
import { ILoginForm } from "./loginForm.types";

export class LoginForm extends Form implements ILoginForm {
    phone = '+7';
    name = 'phone';
    isPhoneTouched = false;
    label = 'Номер телефона';
    check = false;

    validate(): boolean {
        this.isPhoneValid;
        return this.errors.length === 0;
    }
     
    get isPhoneValid(): boolean{
        this.check = /^((\+7|7|8)+([0-9]){10})$/.test(this.phone) && this.phone.length == 12;
        if(this.check == false && !this.errors.find(item => item.key === 'phone')){
            this.errors.push({key: 'phone', message: 'Введите корректный номер телефона'});
        }
        return this.check;
    }
    get isPhoneError(): boolean{
        return !this.isPhoneValid && this.isPhoneTouched
    }
    getErrorMessages(key: string): Array<string>{
        return this.errors.filter(item => item.key === key).map(item => item.message);
    }
}
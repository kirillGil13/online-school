import {UserResponseType} from "@/entity/user/user.types";
import {ILoginForm} from "@/form/login/loginForm.types";

export interface IAuth {
    user(): UserResponseType
    fetch(): Promise<void>
    load(): Promise<any>

    login(data: { data: ILoginForm, fetchUser: boolean, staySignedIn: boolean }): Promise<any>

    logout(data: any): Promise<any>
}

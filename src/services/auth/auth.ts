import { ILoginForm } from '@/form/login/loginForm.types';
import { IUserModule, UserResponseType } from '@/store/modules/users/users.types';
import { IAuthService } from './auth.types';
import axios from 'axios';

export class AuthService implements IAuthService {
    
    async loginUser(user: ILoginForm): Promise<IUserModule>{
        const response = await axios.post('', {
            user
        })
        return (response.data as UserResponseType).user
    }
}
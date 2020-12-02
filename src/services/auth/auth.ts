import { ILoginForm } from '@/form/login/loginForm.types';
import { IAuthService } from './auth.types';
import axios from 'axios';
import { UserResponseType } from '@/entity/user/user.types';

export class AuthService implements IAuthService {
    
    async loginUser(user: ILoginForm): Promise<any>{
        const response = await axios.post('', {
            user
        })
        return response.data as UserResponseType
    }
}
import {IUserUpdateRepository} from '@/repository/userUpdate/UserUpdateRepository.types';
import {IUser, User, UserRequestType, UserResponseType} from '@/entity/user';
import Api from '@/repository/api';

export class UserUpdateRepository implements IUserUpdateRepository {
    async updateUser(user: UserRequestType): Promise<IUser> {
        const response = await Api.post('/users/update', user);
        const data = response.data as UserResponseType;
        return new User(data);
    }
}
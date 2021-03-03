import {IUserUpdateRepository} from '@/repository/userUpdate/UserUpdateRepository.types';
import {IUser, User, UserResponseType, UserUpdateRequestType} from '@/entity/user';
import Api from '@/repository/api';

export class UserUpdateRepository implements IUserUpdateRepository {
    async updateUser(user: UserUpdateRequestType): Promise<IUser> {
        const response = await Api.patch('/accounts', user);
        const data = response.data as UserResponseType;
        return new User(data);
    }
}
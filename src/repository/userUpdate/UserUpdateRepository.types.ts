import {IUser, UserRequestType} from '@/entity/user';

export interface IUserUpdateRepository {
    updateUser(user: UserRequestType): Promise<IUser>;
}
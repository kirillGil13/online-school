import {IUser, UserUpdateRequestType} from '@/entity/user';

export interface IUserUpdateRepository {
    updateUser(user: UserUpdateRequestType): Promise<IUser>;
}

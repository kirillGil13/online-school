import { IUser } from './user.types';

export default class User implements IUser{
    email!: string;
    bio!: string;
    username!: string;
    image!: string;
    token!: string;
    constructor(data: any){
        this.email = data.email;
        this.bio = data.bio;
        this.username = data.username;
        this.image = data.image;
        this.token = data.token;
    }
}
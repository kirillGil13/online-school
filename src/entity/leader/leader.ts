import { ILeader, LeaderResponseType } from './leader.types';

export default class Leader implements ILeader {
    id: number;
    name: string;
    surname: string;
    rating: number;
    master: string;
    img: string;
    constructor(data: LeaderResponseType) {
        this.id = data.id;
        this.name = data.name;
        this.surname = data.surname;
        this.rating = data.rating;
        this.master = data.master;
        this.img = data.img;
    }
    get fullName() {
        return this.name + ' ' + this.surname;
    }
}
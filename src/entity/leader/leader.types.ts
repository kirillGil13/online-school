//пока что так хз че там на бэке дальше будет
export interface ILeader {
    id: number;
    name: string;
    surname: string;
    rating: number;
    master: string;
    img: string;
}
export type LeaderResponseType = {
    id: number;
    name: string;
    surname: string;
    rating: number;
    master: string;
    img: string;
}
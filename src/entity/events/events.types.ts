export interface IEventsListItem {
    id: number;
    title: string;
    time: string;
    dateOfBeginning: string;
    participants: IEventsParticipant[];
}

export interface IEventsParticipant {
    id: number;
    name: string;
    surname: string;
    avatar: string;
}

export type EventsResponseType = {
    id: number;
    title: string;
    time: string;
    dateOfBeginning: string;
    participants: EventsParticipantResponseType[];
}

export type EventsParticipantResponseType = {
    id: number;
    name: string;
    surname: string;
    avatar: string;
}


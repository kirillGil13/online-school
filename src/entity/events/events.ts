import {IEventsListItem, IEventsParticipant, EventsResponseType} from './events.types';

export default class EventsListItem implements IEventsListItem {
    id: number;
    title: string;
    time: string;
    dateOfBeginning: string;
    participants: IEventsParticipant[];
    constructor(data: EventsResponseType) {
        this.id = data.id;
        this.title = data.title;
        this.time = data.time;
        this.dateOfBeginning = data.dateOfBeginning;
        this.participants = data.participants;
    }
}


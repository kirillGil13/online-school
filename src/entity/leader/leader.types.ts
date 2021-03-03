export interface ILeadersListItem {
    id: number;
    name: string;
    lastName: string;
    photoLink: string;
    fullName: string;
}
export type LeadersListItemResponseType = {
    id: number;
    name: string;
    lastName: string;
    photoLink: string;
}
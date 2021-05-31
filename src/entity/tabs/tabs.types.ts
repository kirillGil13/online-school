export interface ITabs {
    id: string | number;
    title: string;
    filter: boolean;
    component: string;
    hidden?: boolean;
    iconName?: string;
}

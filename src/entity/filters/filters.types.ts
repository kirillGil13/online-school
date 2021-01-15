export interface IFilters {
    id: number;
    filter: string[];
    filterType: string;
}
export enum FiltersNameEnum{
    Theme = 'Темы',
    Level = 'Мой уровень',
    Cost = 'Стоимость',
}
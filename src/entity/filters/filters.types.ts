export interface IFilters {
    id: number;
    filter: string[];
    filterType: string;
}
export enum FiltersNameEnum{
    Theme = 'Темы',
    Level = 'Мой уровень',
    Cost = 'Стоимость',
    Period = 'Период'
}
export enum FiltersCourseNameEnum{
    Course = 'Все курсы',
    Theme = 'Все темы',
    Level = 'Уровень',
    Cost = 'Стоимость'
}
export enum FiltersCandidatesNameEnum{
    Status = 'Статус',
    Type = 'Тип',
    Product = 'Продукт',
}

export interface IMainMenu {
    title: string;
    iconName?: string;
    route: string;
    subMenu?: IMainMenu[];
}

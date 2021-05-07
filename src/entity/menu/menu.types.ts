export interface IMainMenu {
    title?: string;
    iconName?: string;
    route?: string;
    extraAction?: boolean;
    subMenu?: IMainMenu[];
}

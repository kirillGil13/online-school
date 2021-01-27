export interface ITabs {
    id: string;
    title: string;
    filter: boolean;
    component: string;
}
export enum TabsNameEnum{
    Main = 'TrainingMain',
    Courses = 'TrainingCourses',
    Club = 'TrainingClub',
    Leaders = 'TrainingLeaders'
}
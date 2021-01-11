export interface ITabs {
    id: string;
    title: string;
    isActive: boolean;
    component: string;
}
export enum TabsNameEnum{
    Main = 'TrainingMain',
    Courses = 'TrainingCourses',
    Club = 'TrainingClub',
    Leaders = 'TrainingLeaders'
}
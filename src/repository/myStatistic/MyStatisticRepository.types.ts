import {IMyStatistic, MyStatisticRequestType} from '@/entity/myStatistic/myStatistic.types';

export interface IMyStatisticRepository {
    fetchData(data: MyStatisticRequestType): Promise<IMyStatistic>;
}
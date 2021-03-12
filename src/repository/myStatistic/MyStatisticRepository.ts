import {IMyStatisticRepository} from '@/repository/myStatistic/MyStatisticRepository.types';
import {IMyStatistic, MyStatisticRequestType, MyStatisticResponseType} from '@/entity/myStatistic/myStatistic.types';
import Api from '@/repository/api';
import MyStatistic from '@/entity/myStatistic/myStatistic';

export class MyStatisticRepository implements IMyStatisticRepository{
    async fetchData(data: MyStatisticRequestType): Promise<IMyStatistic> {
        const response = await Api.get('/statistics/my', {params: data, paramsSerializer: function paramsSerializer(params) {
                return new URLSearchParams(params).toString()
            }});
        const responseData = response.data as MyStatisticResponseType;
        return new MyStatistic(responseData);
    }
}
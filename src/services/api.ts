import Vue from 'vue';
import { AxiosPromise, AxiosRequestConfig } from 'axios';
import { RequestType } from '@/form/form.types';

const Api = {
    get(url: string, config?: AxiosRequestConfig): AxiosPromise {
        return Vue.axios.get(url, config);
    },

    post(url: string, data?: RequestType, config?: AxiosRequestConfig): AxiosPromise {
        return Vue.axios.post(url, data, config);
    },
};

export default Api;
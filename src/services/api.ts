import Vue from 'vue';
import { AxiosPromise, AxiosRequestConfig } from 'axios';

const Api = {
    get(url: string, config?: AxiosRequestConfig): AxiosPromise {
        return Vue.axios.get(url, config);
    },

    post(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise {
        return Vue.axios.post(url, data, config);
    },
};

export default Api;

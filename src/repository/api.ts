import Vue from 'vue';
import {AxiosPromise, AxiosRequestConfig} from 'axios';
import {RequestType} from '@/form/form.types';

const Api = {
    get(url: string, config?: AxiosRequestConfig): AxiosPromise {
        return Vue.axios.get(url, config);
    },

    post(url: string, data?: RequestType, config?: AxiosRequestConfig): AxiosPromise {
        return Vue.axios.post(url, data, config);
    },

    patch(url: string, data?: RequestType, config?: AxiosRequestConfig): AxiosPromise {
        return Vue.axios.patch(url, data, config);
    },

    postFile(fileURL: {url: string; baseURL: string}, data?: any): AxiosPromise {
        return Vue.axios({url: fileURL.url, baseURL: fileURL.baseURL, method: 'POST', data: data});
    },

    getData(fileURL: { url: string; baseURL: string }, data?: any): AxiosPromise {
        const formData = [...data.entries()];
        const asString = formData
            .map(x => `${encodeURIComponent(x[0])}=${encodeURIComponent(x[1])}`)
            .join('&');
        return Vue.axios({url: `${fileURL.url}/?${asString}`, baseURL: fileURL.baseURL, method: 'GET'});
    }
};

export default Api;

/* eslint-disable @typescript-eslint/ban-ts-ignore*/
import { AxiosRequestConfig, AxiosResponse } from 'axios';

export default {
    request: function (req: AxiosRequestConfig, token: string): void {
        // @ts-ignore
        this.http.setHeaders.call(this, req, {
            Authorization: 'Bearer ' + token,
        });
    },

    response: function (res: AxiosResponse): void {
        // @ts-ignore
        const headers = this.http.getHeaders.call(this, res);
        let token = headers.Authorization || headers.authorization;

        if (token === undefined && res.data !== null) {
            token = res.data.token;
        }

        if (token) {
            token = token.split(/Bearer:?\s?/i);

            return token[token.length > 1 ? 1 : 0].trim();
        }
    },
};

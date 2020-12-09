import axios from "axios";

export const conduitApi = axios.create({
    baseURL: 'https://api.onelinks.com/v1'
})
export function setJWT(jwt: string) {
    conduitApi.defaults.headers.common["Authorization"] = `Bearer ${jwt}`
}
export function clearJWT() {
    delete conduitApi.defaults.headers.common["Authorization"]
}

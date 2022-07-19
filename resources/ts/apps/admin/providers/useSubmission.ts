import axios from "axios";
import {getUrl} from "../helpers";

const store = (url: string, data: object): Promise<any> => {
    return axios.put(getUrl(url), JSON.parse(JSON.stringify(data)));
}
const update = (url: string, id: number, data: object): Promise<any> => {
    return axios.put(getUrl([url, id].join(url.endsWith("/") ? "" : "/")), JSON.parse(JSON.stringify(data)));
}
export default function (urls: { submit: string, update: string }) {
    return {
        store: (data: object) => store(urls.submit, data),
        update: (id: number, data: object) => update(urls.update, id, data),
    }
}

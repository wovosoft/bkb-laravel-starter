import axios from "axios";

const store = (url: string, data: object): Promise<any> => {
    // @ts-ignore
    return axios.put([import.meta.env.VITE_API_URL, url].join("/"), JSON.parse(JSON.stringify(data)));
}
const update = (url: string, id: number, data: object): Promise<any> => {
    // @ts-ignore
    return axios.put([import.meta.env.VITE_API_URL, url, id].join("/"), JSON.parse(JSON.stringify(data)));
}
export default function (urls: { submit: string, update: string }) {
    return {
        store: (data: object) => store(urls.submit, data),
        update: (id: number, data: object) => update(urls.update, id, data),
    }
}

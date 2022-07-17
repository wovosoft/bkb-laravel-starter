import axios from "axios";
import {ref, Ref} from "vue";


type DatatableType = {
    total?: number,
    current_page: number,
    per_page?: number,
    last_page?: number,
    first_page?: number,
    data?: object[]
}
const datatable = ref<DatatableType>({current_page: 1})

const getItems = (url: URL | string, query: string) => {
    if (typeof url === "string") {
        url = new URL(url);
    }
    if (datatable.value.current_page) {
        url.searchParams.set("page", datatable.value.current_page.toString());
    }
    if (datatable.value.per_page) {
        url.searchParams.set("per_page", datatable.value.per_page.toString());
    }
    if (query) {
        url.searchParams.set("filter", query);
    }
    // console.log(url.href)

    return axios.post(url.href).then(res => {
        datatable.value = res.data;
        // console.log(res.data)
    }).catch(err => {
        datatable.value = {current_page: 1};
        console.log(err.response)
    });
}

type ReturnType = {
    getItems: (query?: string) => Promise<any>;
    datatable: Ref<DatatableType>
}

export default (api: string): ReturnType => ({
    getItems: (query?: string) => getItems(new URL(api, import.meta.env.VITE_API_URL), query),
    datatable
});

import axios from "axios";
import {ref, Ref} from "vue";
import {getUrl} from "../helpers";
import {loading} from "../shared/globalLoader";

type DatatableType = {
    total?: number,
    current_page: number,
    per_page?: number,
    last_page?: number,
    first_page?: number,
    data?: object[]
}
const datatable = ref<DatatableType>({current_page: 1})

type SearchParamsType = {
    [key: string]: Record<string, any>
};
const searchParams = ref<SearchParamsType>({});

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
    loading.value = true;
    return axios.post(url.href, searchParams.value).then(res => {
        datatable.value = res.data;
        loading.value = false;
        // console.log(res.data)
    }).catch(err => {
        datatable.value = {
            current_page: 1,
            per_page: 15,
            total: 0,
            data: []
        };
        loading.value = false;
        console.log(err.response)
    });
}

type ReturnType = {
    getItems: (query?: string) => Promise<any>;
    datatable: Ref<DatatableType>,
    searchParams: Ref<SearchParamsType>
}

export default (api: string): ReturnType => ({
    getItems: (query?: string) => getItems(getUrl(api), query),
    datatable,
    searchParams
});

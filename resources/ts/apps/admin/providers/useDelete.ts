import axios from "axios";
import type {ResponseType} from "../types/ResponseType";
import {getUrl} from "../helpers";

//pk=primary key

export default function (url: string) {
    return function (pk: number | string): Promise<ResponseType> {
        return axios.delete([getUrl(url), pk].join("/"));
    }
}

//make code readable

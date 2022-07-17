import axios from "axios";
import type {ResponseType} from "../types/ResponseType";

//pk=primary key

export default function (url: string) {
    return function (pk: number | string): Promise<ResponseType> {
        return axios.delete([import.meta["VITE_API_URL"], url, pk].join("/"));
    }
}

//make code readable

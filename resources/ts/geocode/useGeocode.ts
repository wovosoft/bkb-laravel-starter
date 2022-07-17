import {getUrl} from "../apps/admin/helpers";
import axios from "axios";

function fetchData(url: string) {
    return axios.post(url).then(res => {
        return res.data;
    }).catch(err => {
        console.log(err.response.data);
        return {}
    })
}

export function getDivisions() {
    return fetchData(getUrl("geocode/divisions")).then(divisions => divisions);
}

export type Division = {
    id?: number;
    name?: string;
    bn_name?: string;
    url?: string;
}

export function submitDivision(division: Division) {
    let url: string = division.id ? getUrl("geocode/divisions/update/" + division.id) : getUrl("geocode/divisions/store");
    return axios.put(url, division);
}

export function getDistrictsOf(division: { id: number }) {
    return axios.post(getUrl("geocode/divisions/" + division.id + "/districts"));
}

export function getUpazilasOf(district: { id: number }) {

}

export function getUnionsOf(upazila: { id: number }) {

}



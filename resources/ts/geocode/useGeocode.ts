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

export type ItemType = {
    id?: number;
    name?: string;
    bn_name?: string;
    url?: string;
}

//should be removed this type later
export type Division = ItemType


export function submitDivision(division: ItemType) {
    let url: string = division.id ? getUrl("geocode/divisions/" + division.id + "/update") : getUrl("geocode/divisions/store");
    return axios.put(url, division);
}

export function submitDistrict(district: ItemType) {
    let url: string = district.id ? getUrl("geocode/districts/" + district.id + "/update") : getUrl("geocode/districts/store");
    return axios.put(url, district);
}

export function submitUpazila(upazila: ItemType) {
    let url: string = upazila.id ? getUrl("geocode/upazilas/" + upazila.id + "/update") : getUrl("geocode/upazilas/store");
    return axios.put(url, upazila);
}

export function submitUnion(union: ItemType) {
    let url: string = union.id ? getUrl("geocode/unions/" + union.id + "/update") : getUrl("geocode/unions/store");
    return axios.put(url, union);
}

export function getDistrictsOf(division: { id: number }) {
    return axios.post(getUrl("geocode/divisions/" + division.id + "/districts"));
}

export function getUpazilasOf(district: { id: number }) {
    return axios.post(getUrl("geocode/districts/" + district.id + "/upazilas"));
}

export function getUnionsOf(upazila: { id: number }) {
    return axios.post(getUrl("geocode/upazilas/" + upazila.id + "/unions"));
}



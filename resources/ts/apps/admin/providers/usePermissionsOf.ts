import axios from "axios";
import {getUrl} from "../helpers";

function fetchData(url) {
    return axios.post(url).then(res => {
        return res.data;
    }).catch(err => {
        console.log(err.response.data);
        return [];
    });
}

export function ofUser(user: { id: number }) {
    return fetchData(getUrl("admin/users/" + user.id + "/permissions"));
}

export function getRolesOf(user: { id: number }) {
    return fetchData(getUrl("admin/users/" + user.id + "/roles"));
}

export function setRolesOf(user: { id: number }, roles: string[]) {
    return axios.put(getUrl("admin/users/" + user.id + "/storeRoles"), {roles});
}

export function ofRole(role: { id: number }) {
    return fetchData(getUrl("admin/roles/" + role.id + "/permissions"));
}

export function submitUserPermissions(userId: number, permissions) {
    return axios.put(getUrl("admin/users/" + userId + "/storePermissions"), {
        permissions
    });
}

export function submitRolePermissions(roleId: number, permissions) {
    return axios.put(getUrl("admin/roles/" + roleId + "/storePermissions"), {
        permissions
    });
}

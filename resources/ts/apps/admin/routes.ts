import {createRouter, createWebHashHistory, RouteRecordRaw} from "vue-router";

import Index from "./pages/Index.vue";
import Roles from "./pages/roles/Index.vue"
import Permissions from "./pages/permissions/Index.vue";
import Users from "./pages/users/Index.vue";

const routes = <Array<RouteRecordRaw>>[
    {
        name: "home",
        path: '/',
        component: Index
    },
    {
        path: '/users',
        name: 'users.index',
        component: Users
    },
    {
        path: '/roles',
        name: 'roles.index',
        component: Roles
    },
    {
        path: '/permissions',
        name: 'permissions.index',
        component: Permissions
    }
];

export default createRouter({
    // 4. Provide the history implementation to use. We are using the hash history for simplicity here.
    history: createWebHashHistory(),
    routes,
})

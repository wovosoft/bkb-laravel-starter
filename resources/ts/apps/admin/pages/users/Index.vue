<template>
    <BasicCrud header="Users"
               data-url="admin/users"
               destroy-url="admin/users/destroy"
               update-url="admin/users/update"
               submit-url="admin/users/store"
               :fields="fields">
        <template #form-controls="{ item }">
            <FormGroup label="Name">
                <Input v-model="item.name" :required="true" placeholder="Name" type="text" size="sm"/>
            </FormGroup>
            <FormGroup label="Email Address">
                <Input v-model="item.email" :required="true" placeholder="Email Address" type="email" size="sm"/>
            </FormGroup>
        </template>

        <template #action-btns="{ item }">
            <Button title="Roles" @click="$refs.rModal.showRolesOf(item)">
                <Diagram3/>
            </Button>
            <Button
                title="Permissions"
                variant="info"
                @click="$refs.pModal.showPermissionsOf(item)">
                <Bricks/>
            </Button>
        </template>
    </BasicCrud>
    <PermissionsModal ref="pModal"/>
    <RolesModal ref="rModal"/>
</template>

<script lang="ts" setup>
import BasicCrud from "./../../components/BasicCrud.vue";
import {FormGroup, Input, Button, Modal} from "@wovosoft/wovoui";
import {Diagram3, Bricks} from "@wovosoft/wovoui-icons";
import {onMounted, ref} from "vue";

import {
    loaded as permissionsLoaded,
    fetchItems as fetchPermissions
} from "./../../providers/usePermissions";

import PermissionsModal from "./PermissionsModal.vue";
import RolesModal from "./RolesModal.vue";

const fields = [
    "id", "name", "action"
];


onMounted(() => {
    if (!permissionsLoaded.value) {
        fetchPermissions();
    }
})

</script>

<template>
    <BasicCrud header="Permissions" data-url="admin/permissions" destroy-url="admin/permissions/destroy"
        update-url="admin/permissions/update" submit-url="admin/permissions/store" :fields="fields">
        <template #form-controls="{ item }">
            <FormGroup label="Name">
                <Input v-model="item.name" placeholder="Name" size="sm"></Input>
            </FormGroup>
        </template>
    </BasicCrud>
</template>
<script lang="ts" setup>
import BasicCrud from "./../../components/BasicCrud.vue";
import { FormGroup, Input } from "@wovosoft/wovoui";

const fields = [
    "id", "name", "action"
];

const defaultItem = {
    name: null
}
</script>

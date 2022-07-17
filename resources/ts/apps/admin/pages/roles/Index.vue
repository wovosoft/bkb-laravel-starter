<template>
    <BasicCrud header="Roles" data-url="admin/roles" destroy-url="admin/roles/destroy" update-url="admin/roles/update"
        submit-url="admin/roles/store" :fields="fields">
        <template #form-controls="{ item }">
            <FormGroup label="Name">
                <Input v-model="item.name" placeholder="Name" size="sm"></Input>
            </FormGroup>
        </template>

        <template #action-btns="{ item }">
            <Button title="Permissions" @click="showPermissionsOf(item)">
                <Bricks />
            </Button>
        </template>
    </BasicCrud>

    <Modal @hidden="hideModal" v-model="showPermissions" title="Permissions" header-class="py-2 bg-dark text-light"
        button-size="sm" @ok.prevent="submitPermissions" ok-title="Save Changes" close-btn-white>
        <form @submit.prevent="submitPermissions">
            <template v-for="(p, p_index) in permissionsList">
                <div class="form-check">
                    <input type="checkbox" :value="p" :id="'p_id_' + p_index" v-model="permissions"
                        class="form-check-input" />
                    <label class="form-check-label" :for="'p_id_' + p_index">
                        {{ p }}
                    </label>
                </div>
            </template>
        </form>
    </Modal>
</template>


<script lang="ts" setup>
import BasicCrud from "./../../components/BasicCrud.vue";
import { FormGroup, Input, Button, Modal } from "@wovosoft/wovoui";
import { Bricks } from "@wovosoft/wovoui-icons";
import { onMounted, ref } from "vue";
import useToasts from "./../../shared/useToasts";

import {
    items as permissionsList,
    loaded as permissionsLoaded,
    fetchItems as fetchPermissions
} from "./../../providers/usePermissions";
import axios from "axios";
import { getUrl } from "./../../helpers";

//toasts
const { add: addToast } = useToasts();

const fields = [
    "id", "name", "action"
];

//permission modal
const showPermissions = ref<boolean>(false);
const permissions = ref([]);

const currentRoleId = ref<number | null>(null);
function showPermissionsOf(item: { id: number }) {
    showPermissions.value = true;
    currentRoleId.value = item.id

    axios.post(getUrl("admin/roles/" + item.id + "/permissions")).then(res => {
        permissions.value = res.data;
    }).catch(err => {
        console.log(err.response.data);
        permissions.value = [];
    });
}

/**
 * Reloading after submission is not required.
 * Because permissions are not loaded with roles initially.
 * And when it is about to be modified again, data are loaded again from server.
 */

function submitPermissions() {
    axios.put(getUrl("admin/roles/" + currentRoleId.value + "/storePermissions"), {
        permissions: permissions.value
    }).then(res => {
        addToast(res.data);
        hideModal();
    }).catch(err => {
        console.log(err.response.data);
        addToast(err.response.data);
    });
}

function hideModal() {
    showPermissions.value = false;
    currentRoleId.value = null;
    permissions.value = [];
}

onMounted(() => {
    if (!permissionsLoaded.value) {
        fetchPermissions();
    }
})

</script>

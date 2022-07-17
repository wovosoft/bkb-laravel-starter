<template>
    <Modal @hidden="hideModal"
           v-model="show"
           title="User's Direct Permissions"
           header-class="py-2 bg-dark text-light"
           button-size="sm"
           @ok.prevent="handleSubmission"
           ok-title="Save Changes"
           close-btn-white>
        <form @submit.prevent="handleSubmission">
            <template v-for="(p, p_index) in permissionsList">
                <div class="form-check">
                    <input type="checkbox" :value="p" :id="'p_id_' + p_index" v-model="userPermissions"
                           class="form-check-input"/>
                    <label class="form-check-label" :for="'p_id_' + p_index">
                        {{ p }}
                    </label>
                </div>
            </template>
        </form>
    </Modal>
</template>

<script lang="ts" setup>
import {Modal} from "@wovosoft/wovoui";
import {ref} from "vue";

import {
    items as permissionsList
} from "../../providers/usePermissions";

import useToasts from "../../shared/useToasts";

const {add: addToast} = useToasts();

//permission modal
const show = ref<boolean>(false);
const userPermissions = ref([]);

const currentUserId = ref<number | null>(null);

import {
    ofUser as permissionsOf,
    submitUserPermissions
} from "../../providers/usePermissionsOf";

function showPermissionsOf(user: { id: number }) {
    show.value = true;
    currentUserId.value = user.id;
    permissionsOf(user).then(permissions => userPermissions.value = permissions);
}

defineExpose({
    showPermissionsOf
});

/**
 * Reloading after submission is not required.
 * Because permissions are not loaded with roles initially.
 * And when it is about to be modified again, data are loaded again from server.
 */

function handleSubmission() {
    submitUserPermissions(currentUserId.value, userPermissions.value).then(res => {
        addToast(res.data);
        hideModal();
    }).catch(err => {
        console.log(err.response.data);
        addToast(err.response.data);
    });
}

function hideModal() {
    show.value = false;
    currentUserId.value = null;
    userPermissions.value = [];
}
</script>

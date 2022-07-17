<template>
    <Modal
        @hidden="hideModal"
        header-class="py-2 bg-dark text-light"
        button-size="sm"
        ok-title="Save Changes"
        close-btn-white
        title="User Roles"
        @ok.prevent="handleSubmission"
        v-model="show">

        <form @submit.prevent="handleSubmission">
            <template v-for="(p, p_index) in roles">
                <div class="form-check">
                    <input type="checkbox" :value="p" :id="'r_id_' + p_index"
                           v-model="userRoles"
                           class="form-check-input"/>
                    <label class="form-check-label" :for="'r_id_' + p_index">
                        {{ p }}
                    </label>
                </div>
            </template>
        </form>
    </Modal>
</template>

<script lang="ts" setup>

import {Modal} from "@wovosoft/wovoui";
import {onMounted, ref} from "vue";
import {getRolesOf, setRolesOf} from "../../providers/usePermissionsOf";
import useToasts from "../../shared/useToasts";

const {add: addToast} = useToasts();

import {
    items as roles,
    fetchItems as getRoles,
    loaded
} from "../../providers/useRoles";


//models
const show = ref<boolean>(false);
const userRoles = ref<string[] | null>([]);
const currentUser = ref<{ id: number }>(null);


function showRolesOf(user: { id: number }) {
    show.value = true;
    currentUser.value = user;
    getRolesOf(user).then(res => {
        userRoles.value = res;
    })
}

function handleSubmission() {
    setRolesOf(currentUser.value, userRoles.value).then(res => {
        addToast(res.data);
        hideModal();
    }).catch(err => {
        console.log(err.response.data);
        addToast(err.response.data);
    });
}

//onMounted
onMounted(() => {
    if (!loaded.value) {
        getRoles();
    }
})

function hideModal() {
    show.value = false;
    userRoles.value = [];
    currentUser.value = null;
}

//exposed to parents
defineExpose({
    showRolesOf
});
</script>

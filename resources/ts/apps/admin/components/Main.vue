<template>
    <TheNavbar/>
    <Container fluid>
        <router-view></router-view>
    </Container>
    <ToastContainer placement="top-right" container="body" class="position-fixed pt-2 pe-2" style="z-index: 9999">
        <template v-for="(toast,toast_index) in toasts">
            <Toast show :variant="toast.variant" no-body class="text-white">
                <div class="d-flex">
                    <ToastBody>
                        {{ toast.message }}
                    </ToastBody>
                    <ButtonClose class="me-2 m-auto" white @click="removeToast(toast_index)"/>
                </div>
            </Toast>
        </template>
    </ToastContainer>
</template>

<script lang="ts" setup>
import useToasts from "../shared/useToasts";
import TheNavbar from "./TheNavbar.vue";
import {Container, ToastContainer, Toast, ToastBody, ButtonClose} from "@wovosoft/wovoui";

const {remove: removeToast,toasts} = useToasts();
</script>

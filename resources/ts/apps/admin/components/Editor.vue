<template>
    <Modal v-model="modelValue" ok-title="Save Changes" header-class="bg-dark text-white py-2" button-size="sm"
        close-btn-white header="Add/Edit Data" @ok.prevent="processSubmission" @hidden="$emit('hidden', true)">
        <template v-if="modelValue">
            <form @submit.prevent="processSubmission">
                <slot></slot>
            </form>
        </template>
    </Modal>
</template>

<script lang="ts" setup>
import { Modal } from "@wovosoft/wovoui";
import useSubmission from "../providers/useSubmission";
import { PropType } from "vue";


const props = defineProps({
    item: { type: Object as PropType<object | any>, default: null },
    modelValue: { type: Boolean as PropType<boolean>, default: false },
    submitUrl: { type: String as PropType<string>, required: null },
    updateUrl: { type: String as PropType<string>, required: null },
    handleSubmit: { type: Function as PropType<(() => void) | null> },
});

const emit = defineEmits<{
    (e: 'hidden', value: boolean): void,
    (e: 'success', value: object): void,
    (e: 'failed', value: object): void,
    (e: 'update:modelValue', value: boolean): void,
}>();

const { store, update } = useSubmission({
    submit: props.submitUrl,
    update: props.updateUrl
});

function defaultHandler() {
    (props.item.id ? update(props.item.id, props.item) : store(props.item)).then(res => {
        emit("success", res.data);
        emit("update:modelValue", false);
    }).catch(err => {
        console.log(err.response.data.message)
        emit("failed", err.response.data);
    });
}

function processSubmission() {
    props.handleSubmit ? props.handleSubmit() : defaultHandler();
}
</script>

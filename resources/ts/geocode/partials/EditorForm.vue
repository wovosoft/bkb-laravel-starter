<template>
    <Modal v-model="modelValue"
           @hidden="onHideModal"
           button-size="sm"
           ok-title="Save Changes"
           header-class="py-2 bg-dark text-white"
           close-btn-white
           @ok.prevent="handleSubmission"
           title="Add/Edit">
        <form ref="theForm" @submit.prevent="handleSubmission">
            <FormGroup label="Name *">
                <Input
                    size="sm"
                    :required="true"
                    placeholder="Name"
                    v-model="item.name"
                />
            </FormGroup>
            <FormGroup label="Bengali Name *">
                <Input
                    size="sm"
                    :required="true"
                    placeholder="Name in Bengali"
                    v-model="item.bn_name"
                />
            </FormGroup>
            <FormGroup label="URL">
                <Input
                    size="sm"
                    placeholder="URL"
                    v-model="item.url"
                />
            </FormGroup>
        </form>
    </Modal>
</template>

<script lang="ts" setup>
import useToasts from "../../apps/admin/shared/useToasts";

const {add: addToast} = useToasts();

import {FormGroup, Input, Modal} from "@wovosoft/wovoui";
import {PropType, ref, watch} from "vue";
import {
    submitDivision,
    submitDistrict,
    submitUpazila,
    submitUnion
} from "../useGeocode";
import type {ItemType} from "../useGeocode";

const props = defineProps({
    modelValue: {type: Boolean as PropType<boolean>, default: false},
    currentItem: {type: Object as PropType<ItemType>, default: () => ({})},
    type: {type: String as PropType<'division' | 'district' | 'upazila' | 'union'>, default: 'division'}
});

const item = ref<ItemType>({
    name: null,
    bn_name: null,
    url: null
});

const emit = defineEmits<{
    (e: 'update:modelValue', value: boolean): void,
    (e: 'update:currentDivision', value: ItemType): void,
    (e: 'divisionUpdated', value: boolean): void,
}>()

watch(() => props.currentItem, value => item.value = value);
watch(item, value => emit("update:currentDivision", value));


function onHideModal() {
    emit("update:modelValue", false);
    item.value = {
        name: null,
        bn_name: null,
        url: null
    };
}

const theForm = ref<HTMLFormElement>(null)

function handleSubmission() {
    if (theForm.value.reportValidity()) {
        (() => {
            return {
                "division": () => submitDivision(item.value),
                "district": () => submitDistrict(item.value),
                "upazila": () => submitUpazila(item.value),
                "union": () => submitUnion(item.value),
            }[props.type]?.();
        })()?.then(res => {
            addToast(res.data);
            emit("divisionUpdated", true);
            emit("update:modelValue", false);
        });
    }
}
</script>


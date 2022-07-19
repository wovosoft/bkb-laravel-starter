<template>
    <Modal v-model="modelValue" :header="title"
           close-btn-white
           @hidden="hideModal"
           header-class="py-2 bg-dark text-light" button-size="sm">
        <Table v-if="item" bordered hover striped small>
            <TBody>
            <Tr v-for="(item,item_key) in items" :key="item_key">
                <Td>{{ startCase(item.key) }}</Td>
                <Td>{{ format(item.key) }}</Td>
            </Tr>
            </TBody>
        </Table>
    </Modal>
</template>

<script lang="ts" setup>
import dayjs from 'dayjs'
import {startCase} from "lodash";
import {computed, PropType} from "vue";
import {objectToTable} from "../helpers";
import {Modal, Table, Tr, Td, TBody} from "@wovosoft/wovoui";
import {OfficeInterface} from "../../../bkb-offices/types";

const props = defineProps({
    title: {type: String as PropType<string>, default: "Preview"},
    item: {type: [Object, null] as PropType<object | null>, required: true},
    modelValue: {type: Boolean as PropType<boolean>, default: false},
    formatters: {
        type: Object as PropType<object>,
        default: () => ({
            created_at: (value) => dayjs(value).format("DD/MM/YYYY h:mm A"),
            updated_at: (value) => dayjs(value).format("DD/MM/YYYY h:mm A"),
        })
    }
});
const items = computed<object[]>(() => objectToTable(props.item));
const format = (key) => props.formatters[key]?.(props.item[key]) || props.item[key];

const emit = defineEmits<{
    (e: "update:modelValue", value: boolean): void
    (e: "update:item", value: OfficeInterface | null): void
}>();

function hideModal() {
    emit("update:modelValue", false);
    emit("update:item", null);
}
</script>

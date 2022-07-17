<template>
    <Row class="my-3">
        <Col :md="6" :sm="12">
            <h4 class="p-0 m-0">{{ header }}</h4>
        </Col>
        <Col :md="6" :sm="12" class="text-end">
            <ButtonGroup size="sm">
                <Button variant="primary" titile="Add" @click="askNewItem">
                    <Plus></Plus>
                </Button>
            </ButtonGroup>
        </Col>
    </Row>

    <DataTable bordered hover striped small :items="datatable.data" :fields="fields">
        <template #cell(action)="row">
            <ButtonGroup size="sm" aria-label="Actions">
                <slot name="action-btns" :item="row.item"></slot>
                <Button variant="dark" @click="previewData(JSON.parse(JSON.stringify(row.item)))">
                    <Eye/>
                </Button>
                <Button v-if="updateUrl" variant="primary" @click="showEditor(JSON.parse(JSON.stringify(row.item)))">
                    <PencilFill/>
                </Button>
                <Button v-if="destroyUrl" variant="danger" @click="deleteItem(row.item)">
                    <Trash/>
                </Button>
            </ButtonGroup>
        </template>
    </DataTable>

    <Row>
        <Col :md="6" :sm="12">
            Total: {{ datatable.total }}
        </Col>
        <Col :md="6" :sm="12">
            <Pagination
                size="sm"
                align="end"
                :total-rows="datatable.total"
                :per-page="datatable.per_page"
                v-model.number="datatable.current_page"
            />
        </Col>
    </Row>

    <Preview @hidden="() => { currentItem = null; isPreviewShown = false; }"
             v-model:item="currentItem"
             v-model="isPreviewShown"/>

    <Editor v-model="isEditorShown" :submit-url="submitUrl" :update-url="updateUrl" @success="success" @failed="failed"
            @hidden="() => { currentItem = null; isEditorShown = false; }" v-model:item="currentItem">
        <slot name="form-controls" :item="currentItem"></slot>
    </Editor>
</template>

<script lang="ts" setup>
import {DataTable, ButtonGroup, Button, Row, Col, Pagination} from "@wovosoft/wovoui";
import {Eye, PencilFill, Trash, Plus} from "@wovosoft/wovoui-icons";
import Preview from "./Preview.vue";
import Editor from "./Editor.vue";

import {onMounted, PropType, ref, watch} from "vue";
import usePagination from "../providers/usePagination";
import useDelete from "../providers/useDelete";
import useToasts, {ToastType} from "../shared/useToasts";

const {add: addToast} = useToasts();

const props = defineProps({
    header: {type: String as PropType<string>, required: true},
    dataUrl: {type: String as PropType<string>, required: true},
    destroyUrl: {type: String as PropType<string>, default: null},
    updateUrl: {type: String as PropType<string>, default: null},
    submitUrl: {type: String as PropType<string>, default: null},
    fields: {type: Array as PropType<object[] | string[]>, default: () => ([])},
    defaultItem: {type: Object as PropType<object>, default: () => ({})}
});

const {datatable, getItems} = usePagination(props.dataUrl);
const deleteHandler = useDelete(props.destroyUrl);

const deleteItem = (pk: { id: number }) => {
    if (confirm("Are You Sure?")) {
        deleteHandler(pk.id).then(res => {
            addToast(res.data);
        }).catch(err => {
            console.log(err.response.data)
            addToast(err.response.data);
        });
    }
}

onMounted(() => {
    getItems();
});

const isPreviewShown = ref<boolean>(false);
const currentItem = ref<object>(null);
const previewData = (item: object) => {
    isPreviewShown.value = true;
    currentItem.value = item;
}

const isEditorShown = ref<boolean>(false);
const showEditor = (item: object) => {
    isEditorShown.value = true;
    currentItem.value = item;
}

const success = (res: ToastType) => {
    addToast({
        message: res?.message || "Operation Successful",
        variant: res?.variant || "primary"
    });
    getItems();
}

const failed = (res: ToastType) => addToast({
    message: res?.message || "Operation Failed",
    variant: res?.variant || "danger"
})

function askNewItem() {
    isEditorShown.value = true;
    currentItem.value = JSON.parse(JSON.stringify(props.defaultItem));
}

watch(() => datatable.value.current_page, (value) => getItems());
</script>

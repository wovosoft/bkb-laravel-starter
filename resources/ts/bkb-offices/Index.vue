<template>
    <Card class="mt-3" header="Offices" body-class="p-1">
        <Row class="my-2">
            <Col :md="3" :sm="12">
                <InputGroup prepend="Type" size="sm">
                    <Select
                        text-field="text"
                        value-field="value"
                        v-model="searchParams.type"
                        :options="officeTypes"
                    />
                </InputGroup>
            </Col>
            <Col :md="4" :sm="12">
                <InputGroup prepend="Belongs To" size="sm">
                    <SearchOffices class="p-0 border-0 form-control" v-model="searchParams.parent_id"/>
                </InputGroup>
            </Col>
            <Col :md="3" :sm="12">
                <Input v-model="query" size="sm" placeholder="Search...." type="search"/>
            </Col>
            <Col :md="2" :sm="12" class="text-end">
                <Button title="Add New Office" variant="primary" size="sm" @click="addItem">
                    <Plus/>
                </Button>
                <ButtonGroup size="sm" class="ms-2">
                    <Button title="Reset Query Parameters" variant="primary" @click="resetQuery">
                        <Trash/>
                    </Button>
                    <Button title="Search Offices" variant="dark" @click="loadItems">
                        <Search/>
                    </Button>
                </ButtonGroup>
            </Col>
        </Row>
        <DataTable
            bordered
            small
            :fields="fields"
            :items="datatable.data">
            <template #cell(action)="row">
                <ButtonGroup size="sm">
                    <Button variant="primary" title="View" @click="showItem(row.item)">
                        <Eye/>
                    </Button>
                    <Button title="Edit" @click="editItem(row.item)">
                        <Pencil/>
                    </Button>
                    <Button title="Danger" variant="danger" @click="deleteOffice(row.item)">
                        <Trash/>
                    </Button>
                    <Button variant="secondary"
                            v-if="!['br','rao','cb'].includes(row.item.type)"
                            title="Get Children Off" @click="getChildrenOf(row.item)">
                        <ListCheck/>
                    </Button>
                </ButtonGroup>
            </template>
        </DataTable>
        <template #footer>
            <Row>
                <Col :md="6" :sm="12">
                    Total: {{ datatable.total }}
                </Col>
                <Col :md="6" :sm="12">
                    <Pagination
                        @change="loadItems"
                        class="mb-0"
                        size="sm"
                        align="end"
                        v-model="datatable.current_page"
                        :per-page="datatable.per_page"
                        :total-rows="datatable.total"
                    />
                </Col>
            </Row>
        </template>
    </Card>
    <Preview
        v-model="isDetailsShown"
        title="Office Details"
        v-model:item="currentItem"
    />
    <EditorForm
        v-model="isEditorShown"
        v-model:item="currentItem"
        @success="loadItems"
    />
</template>

<script lang="ts" setup>
import officeTypes from "./providers/officeTypes";
import {
    Button,
    ButtonGroup,
    Card,
    Col,
    DataTable,
    Input,
    InputGroup,
    Pagination,
    Row,
    Select
} from "@wovosoft/wovoui";

import {
    Eye, Pencil, Trash, Plus, Search, ListCheck
} from "@wovosoft/wovoui-icons";

import usePagination from "../apps/admin/providers/usePagination";
import useDelete from "../apps/admin/providers/useDelete";
import useToasts from "../apps/admin/shared/useToasts";
import {onMounted, ref} from "vue";

const tryDelete = useDelete("offices/delete");
const {add: addToast} = useToasts();


import Preview from "../apps/admin/components/Preview.vue";
import EditorForm from "./EditorForm.vue";
import {OfficeInterface, OfficeType} from "./types";
import SearchOffices from "./SearchOffices.vue";

const {datatable, getItems, searchParams} = usePagination("offices");
const query = ref<string>(null);
const isDetailsShown = ref<boolean>(false);
const currentItem = ref<OfficeInterface | null>(null);

const fields = [
    {key: 'id', label: "ID"},
    {key: 'name'},
    {key: 'bn_name'},
    {key: 'code'},
    {
        key: 'type',
        formatter: (v, k) => officeTypes.find(office => office.value === v[k])?.text
    },
    {
        key: 'action',
        thClass: 'text-end',
        tdClass: 'text-end'
    }
];

onMounted(loadItems);

function loadItems() {
    getItems(query.value);
}

function resetQuery() {
    searchParams.value = {};
    query.value = null;
    loadItems();
}

function showItem(item) {
    currentItem.value = item;
    isDetailsShown.value = true;
}

const isEditorShown = ref<boolean>(false);

function editItem(item: OfficeInterface) {
    currentItem.value = item;
    isEditorShown.value = true;
}

function addItem() {
    currentItem.value = {
        name: null,
        bn_name: null,
        code: null,
        recommended_manpower: null,
        description: null,
        address: null,
        type: null,
        parent_id: null
    };
    isEditorShown.value = true;
}

function deleteOffice(office: { id: number }) {
    if (confirm("Are You Sure?")) {
        tryDelete(office.id).then(res => {
            addToast({...res.data, variant: 'primary'});
            loadItems();
        }).catch(err => {
            console.log(err.response.data);
            addToast({...err.response.data, variant: 'danger'});
        });
    }
}

function getChildrenOf(item) {
    searchParams.value.parent_id = item.id;
    loadItems();
}
</script>

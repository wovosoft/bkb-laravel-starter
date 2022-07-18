<template>
    <Card class="mt-3" header="Offices" body-class="p-1">
        <Row class="my-2">
            <Col :md="3" :sm="12">
                <Select size="sm" :options="officeTypes"></Select>
            </Col>
            <Col :md="3" :sm="12">
                <Input size="sm" placeholder="Search...." type="search"/>
            </Col>
            <Col :md="3" :sm="12">
                <Button variant="primary" size="sm">
                    <Plus/> Add
                </Button>
            </Col>
        </Row>
        <DataTable
            bordered
            small
            :fields="['id','name','bn_name','code','type','address','description','action']"
            :items="datatable.data">
            <template #cell(action)="row">
                <ButtonGroup size="sm">
                    <Button variant="primary" title="View">
                        <Eye/>
                    </Button>
                    <Button title="Edit">
                        <Pencil/>
                    </Button>
                    <Button title="Danger" variant="danger">
                        <Trash/>
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
</template>

<script lang="ts" setup>
import officeTypes from "./providers/officeTypes";
import {Button, ButtonGroup, Card, Col, DataTable, Input, Pagination, Row, Select} from "@wovosoft/wovoui";
import {Eye, Pencil, Trash, Plus} from "@wovosoft/wovoui-icons";
import usePagination from "../apps/admin/providers/usePagination";
import {onMounted, watch} from "vue";

const {datatable, getItems} = usePagination("offices");
onMounted(() => {
    getItems();
});
watch(() => datatable.value.current_page, () => getItems())
</script>

<template>
    <Row class="mt-3">
        <Col :md="3" :sm="12">
            <Editor
                @selected:editItem="editItemSelected"
                type="division"
                @selected:item="item=>currentDivision=item"
            />
        </Col>
        <Col :md="3" :sm="12">
            <Editor
                @selected:editItem="editItemSelected"
                type="district"
                v-model:parent="currentDivision"
                @selected:item="item=>currentDistrict=item"
            />
        </Col>
        <Col :md="3" :sm="12">
            <Editor
                @selected:editItem="editItemSelected"
                type="upazila"
                v-model:parent="currentDistrict"
                @selected:item="item=>currentUpazila=item"
            />
        </Col>
        <Col :md="3" :sm="12">
            <Editor
                @selected:editItem="editItemSelected"
                type="union"
                v-model:parent="currentUpazila"
            />
        </Col>
    </Row>
    <EditorForm
        v-model="showForm"
        v-model:type="editingType"
        v-model:current-item="editItem"
    />
</template>

<script lang="ts" setup>

import {Col, Row} from "@wovosoft/wovoui";
import {ref} from "vue";

import type {ItemType} from "./useGeocode";
import Editor from "./partials/Editor.vue";
import EditorForm from "./partials/EditorForm.vue";

const currentDivision = ref<ItemType>(null);
const currentDistrict = ref<ItemType>(null);
const currentUpazila = ref<ItemType>(null);

const editingType = ref<'division' | 'district' | 'upazila' | 'union'>("division");
const editItem = ref<ItemType>({
    name: null,
    bn_name: null,
    url: null
});
const showForm = ref<boolean>(false);

function editItemSelected(e) {
    editingType.value = e.type;
    editItem.value = e.item;
    showForm.value = true;
}
</script>

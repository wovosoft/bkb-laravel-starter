<template>
    <Modal
        button-size="sm"
        size="lg"
        @hidden="hideModal"
        v-model="modelValue"
        title="Office Details"
        ok-title="Save Changes"
        header-class="py-2 bg-dark text-light"
        @ok.prevent="handleSubmission"
        close-btn-white>
        <form ref="theForm" v-if="modelValue && editItem" @submit.prevent="handleSubmission">
            <Row>
                <Col :md="6" :sm="12">
                    <FormGroup label="Office Type *">
                        <Select
                            :required="true"
                            v-model="editItem.type"
                            size="sm"
                            text-field="text"
                            value-field="value"
                            :options="officeTypes"
                        />
                    </FormGroup>
                </Col>
                <Col :md="6" :sm="12">
                    <FormGroup label="Belongs To">
                        <SearchOffices
                            v-model:initial="editItem.parent"
                            v-model="editItem.parent_id"
                        />
                    </FormGroup>
                </Col>
                <Col :md="6" :sm="12">
                    <FormGroup label="Name *">
                        <Input placeholder="Office Name" v-model="editItem.name" size="sm" :required="true"/>
                    </FormGroup>
                </Col>
                <Col :md="6" :sm="12">
                    <FormGroup label="Bengali name">
                        <Input size="sm" placeholder="Office Name in Bengali" v-model="editItem.bn_name"/>
                    </FormGroup>
                </Col>
                <Col :md="6" :sm="12">
                    <FormGroup label="CODE">
                        <Input size="sm" placeholder="Office Code" v-model="editItem.code"/>
                    </FormGroup>
                </Col>
                <Col :md="6" :sm="12">
                    <FormGroup label="Recommended Manpower">
                        <Input size="sm" placeholder="Recommended Manpower" v-model="editItem.recommended_manpower"
                               type="number"/>
                    </FormGroup>
                </Col>
                <Col :md="6" :sm="12">
                    <FormGroup label="Description">
                        <Textarea size="sm" placeholder="Office Description" v-model="editItem.description"/>
                    </FormGroup>
                </Col>
                <Col :md="6" :sm="12">
                    <FormGroup label="Address">
                        <Textarea size="sm" placeholder="Office Address" v-model="editItem.address"/>
                    </FormGroup>
                </Col>
            </Row>
        </form>
    </Modal>
</template>

<script lang="ts" setup>
import {
    Col, FormGroup, Input, Modal, Row, Select, Textarea,
} from "@wovosoft/wovoui";
import officeTypes from "./providers/officeTypes";
import useSubmission from "../apps/admin/providers/useSubmission";
import {PropType, ref, watch} from "vue";
import {OfficeInterface} from "./types";
import useToasts from "../apps/admin/shared/useToasts";
import SearchOffices from "./SearchOffices.vue";

const {add: addToast} = useToasts();

const props = defineProps({
    modelValue: {
        type: Boolean as PropType<boolean>,
        default: false
    },
    item: {
        type: [Object, null] as PropType<OfficeInterface | null>,
        default: null,
        required: true
    }
});

const emit = defineEmits<{
    (e: "update:modelValue", value: boolean): void
    (e: "update:item", value: OfficeInterface | null): void
    (e: "success", value: boolean): void
    (e: "failed", value: boolean): void
}>();

function hideModal() {
    emit("update:modelValue", false);
    emit("update:item", null);
}

const theForm = ref<HTMLFormElement>(null);
const editItem = ref<OfficeInterface>(null);

watch(() => props.item, value => editItem.value = JSON.parse(JSON.stringify(value)));

const {store, update} = useSubmission({
    submit: "offices/store",
    update: "offices/update"
});

function handleSubmission() {
    if (theForm.value.reportValidity()) {
        (
            editItem.value.id
                ? update(editItem.value.id, editItem.value) : store(editItem.value)
        )?.then(res => {
            addToast({
                ...res.data,
                variant: 'primary'
            });
            emit("success", true);
            hideModal();
        }).catch(err => {
            console.log(err.response.data)
            addToast({
                ...err.response.data,
                variant: 'danger'
            });
            emit("failed", true);
        })
    }
}
</script>

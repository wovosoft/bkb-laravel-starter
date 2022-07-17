<template>
    <Card header="Divisions">
        <ListGroup v-if="divisions?.data">
            <ListGroupItem v-for="(div,div_key) in divisions.data" :key="div_key">
                <div class="d-flex">
                    <div class=" flex-grow-1">{{ [div.name, div.bn_name].join(' | ') }}</div>
                    <ButtonGroup size="sm">
                        <Button variant="primary" title="Edit" @click="showDivisionForm(div)">
                            <Pencil/>
                        </Button>
                        <Button title="Districts" variant="dark" @click="selectDivision(div)">
                            <List/>
                        </Button>
                    </ButtonGroup>
                </div>
            </ListGroupItem>
        </ListGroup>
    </Card>
    <DivisionForm
        @divisionUpdated="loadDivisions"
        v-model="isDivFormShown"
        v-model:current-division="currentDivision"
    />
</template>

<script lang="ts" setup>

import {Button, ButtonGroup, Card, Col, ListGroup, ListGroupItem, Modal, Row} from "@wovosoft/wovoui";
import {List, Pencil} from "@wovosoft/wovoui-icons";
import {onMounted, ref} from "vue";
import {
    Division,
    getDivisions
} from "../useGeocode";
import DivisionForm from "./../partials/DivisionForm.vue";

const divisions = ref<{
    current_page?: number;
    per_page?: number;
    data?: {
        name?: string;
        bn_name?: string;
    }
}>({});

function loadDivisions() {
    getDivisions().then(res => divisions.value = res);
}

onMounted(() => {
    loadDivisions();
});

//modals
const isDivFormShown = ref<boolean>(false);
const currentDivision = ref<Division>({});

function showDivisionForm(division: Division) {
    isDivFormShown.value = true;
    currentDivision.value = JSON.parse(JSON.stringify(division));
}

const emit = defineEmits<{
    (e: 'divisionSelected', value: Division): void,
}>()

function selectDivision(division: Division) {
    emit("divisionSelected", division);
}
</script>

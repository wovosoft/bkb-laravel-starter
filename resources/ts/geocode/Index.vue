<template>
    <Row class="mt-3">
        <Col :md="3" :sm="12">
            <Divisions @divisionSelected="div=>selectedDivision=div"/>
        </Col>
        <Col :md="3" :sm="12">
            <Districts :division="selectedDivision"/>
        </Col>
        <Col :md="3" :sm="12"></Col>
        <Col :md="3" :sm="12"></Col>
    </Row>
</template>

<script lang="ts" setup>

import {Col, Row} from "@wovosoft/wovoui";
import Divisions from "./partials/Divisions.vue";
import Districts from "./partials/Districts.vue";
import {ref} from "vue";

import {Division} from "./useGeocode";

const selectedDivision = ref<Division>(null);
</script>

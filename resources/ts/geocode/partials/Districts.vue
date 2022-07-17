<template>
    <Card title="Districts">

    </Card>
</template>

<script lang="ts" setup>
import {Card} from "@wovosoft/wovoui";
import {PropType, ref, watch} from "vue";
import {Division, getDistrictsOf} from "../useGeocode";

const props = defineProps({
    division: {type: Object as PropType<Division>, default: null}
});

const districts = ref();
watch(() => props.division, division => {
    if (division) {
        getDistrictsOf(division).then(res => {
            console.log(res.data)
        });
    }
})
</script>


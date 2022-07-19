<template>
    <TypeHead
        v-model="model"
        :get-label="getLabel"
        :get-option="getLabel"
        :get-items="getItems">
    </TypeHead>
</template>

<script lang="ts" setup>
import {getUrl} from "../apps/admin/helpers";
import {TypeHead} from "@wovosoft/wovoui";
import {onMounted, PropType, ref, Ref, watch} from "vue";
import {OfficeInterface} from "./types";
import axios from "axios";

const props = defineProps({
    modelValue: {type: [Number, null] as PropType<number | null>, default: null},
    initial: {type: [Object, null] as PropType<OfficeInterface | null>, default: null}
});

const emit = defineEmits<{
    (e: "update:modelValue", value: number)
}>();

const model = ref<OfficeInterface>(null);
onMounted(() => {
    model.value = props.initial;
})
watch(model, value => emit("update:modelValue", value.id));

function getItems(items: Ref<OfficeInterface[]>, query: Ref<string | number | null>) {
    axios.post(getUrl('offices/options'), {filter: query.value}).then(res => {
        items.value = res.data;
    }).catch(err => {
        console.log(err.response.data);
        items.value = [];
    });
}

function getLabel(office: OfficeInterface) {
    return office ? [office.name, office.bn_name].join(" | ") : 'Not Selected';
}

</script>


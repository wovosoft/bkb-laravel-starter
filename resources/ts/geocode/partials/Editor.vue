<template>
    <Card :header="startCase(type)+'s'">
        <ListGroup>
            <ListGroupItem
                class="py-1"
                :active="currentItem?.id===item.id"
                v-for="(item, item_key) in items" :key="item_key">
                <div class="d-flex">
                    <div class=" flex-grow-1">{{ [item.name, item.bn_name].join(' | ') }}</div>
                    <ButtonGroup size="sm">
                        <Button variant="danger" title="Edit" @click="selectForEdit(item)">
                            <Pencil/>
                        </Button>
                        <Button v-if="type!=='union'" title="Districts" variant="dark" @click="selectItem(item)">
                            <List/>
                        </Button>
                    </ButtonGroup>
                </div>
            </ListGroupItem>
        </ListGroup>
    </Card>
    <EditorForm/>
</template>

<script lang="ts" setup>
import {startCase} from "lodash";
import {Card, ListGroup, ListGroupItem, ButtonGroup, Button} from "@wovosoft/wovoui";
import {Pencil, List} from "@wovosoft/wovoui-icons";
import {onMounted, PropType, ref, watch} from "vue";
import {
    getDistrictsOf,
    getDivisions,
    getUpazilasOf,
    getUnionsOf,
    ItemType
} from "../useGeocode";

import EditorForm from "./EditorForm.vue";

const props = defineProps({
    type: {type: String, default: "division", required: true},
    parent: {type: Object as PropType<ItemType>, default: null}
});

const items = ref<ItemType[]>([]);

const emit = defineEmits<{
    (e: 'selected:item', value: ItemType): void,
    (e: 'selected:editItem', value: object): void,
}>();

const currentItem = ref<ItemType>({
    name: null,
    bn_name: null,
    url: null
});


function selectItem(theItem: ItemType) {
    currentItem.value = theItem;
    emit("selected:item", theItem);
}

function selectForEdit(theItem: ItemType) {
    emit("selected:editItem", {
        type: props.type,
        item: theItem
    });
}

onMounted(() => {
    if (props.type === "division") {
        getDivisions().then(res => {
            items.value = res.data;
        });
    }
});

watch(() => props.parent, item => {
    if (item) {
        if (props.type === "district") {
            getDistrictsOf(item).then(res => items.value = res.data);
        } else if (props.type === "upazila") {
            getUpazilasOf(item).then(res => items.value = res.data);
        } else if (props.type === "union") {
            getUnionsOf(item).then(res => items.value = res.data);
        }
    }
});
</script>


<template>
    <li role="presentation">
        <router-link class="dropdown-item" :to="to">
            <slot></slot>
        </router-link>
    </li>
</template>

<script lang="ts" setup>
import {PropType} from "vue";

type ToType = {
    name: string
}
const props = defineProps({
    to: {type: Object as PropType<ToType>, required: true}
});
</script>

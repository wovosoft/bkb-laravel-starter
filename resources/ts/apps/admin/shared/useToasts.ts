import {ref} from "vue";
import type {ColorVariants} from "@wovosoft/wovoui/src/types/colorVariants";

export interface ToastType {
    title?: string | null;
    message?: string;
    variant?: ColorVariants;
}

const toasts = ref<ToastType[]>([]);

export default () => ({
    add: (toast: ToastType) => toasts.value.push(toast),
    remove: (index: number) => toasts.value.splice(index, 1),
    toasts
});

import axios from "axios";
import { ref } from "vue";

const items = ref<string[]>([]);
const loaded = ref<boolean>(false);
const loading = ref<boolean>(false);


function fetchItems() {
    let url = new URL("admin/permissions/list", import.meta.env.VITE_API_URL);

    loading.value = true;
    axios.post(url.href).then(res => {
        items.value = res.data;
        loading.value = false;
        loaded.value = true;
    }).catch(err => {
        console.log(err.response?.data);
        items.value = [];
        loading.value = false;
    });
}

export { items, loaded, loading, fetchItems }


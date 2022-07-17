import axios from "axios";
import {ref} from "vue";
import {getUrl} from "../helpers";

const items = ref<string[]>([]);
const loaded = ref<boolean>(false);
const loading = ref<boolean>(false);


function fetchItems() {
    loading.value = true;
    axios.post(getUrl("admin/roles/list")).then(res => {
        items.value = res.data;
        loading.value = false;
        loaded.value = true;
    }).catch(err => {
        console.log(err.response?.data);
        items.value = [];
        loading.value = false;
    });
}

//todo: implement later
function submit() {

}

export {items, loaded, loading, fetchItems}


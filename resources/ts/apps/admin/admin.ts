import '../../bootstrap';


import {createApp} from "vue";

import routes from "./routes";

import Main from "./components/Main.vue";

const app = createApp(Main);
app.use(routes);
app.mount(document.getElementById("app"));

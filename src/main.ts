import { createApp } from "vue";
import App from "./App.vue";
import "./index.css";
import router from "./router.ts";
import store from "./stores";

const app = createApp(App);

app.use(store);
app.use(router);
app.mount("#app");

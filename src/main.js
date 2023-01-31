import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { createPinia } from "pinia";

import * as Realm from "realm-web";

import "./styles.css";

const realmApp = new Realm.App({ id: "application-0-zqrmn" });
const app = createApp(App);
const pinia = createPinia();

app.config.globalProperties.realmApp = realmApp;
app.use(router);
app.use(pinia);

app.mount("#app");

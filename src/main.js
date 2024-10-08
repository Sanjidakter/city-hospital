import { createApp } from "vue";
import App from "./App.vue";
import { createHead } from "@vueuse/head";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "bootstrap-icons/font/bootstrap-icons.css";
import "@fortawesome/fontawesome-free/css/all.css";
import "bootstrap";
import "../src/assets/css/style.css";
import "aos/dist/aos.css";
import router from "./router";

const app = createApp(App);

let baseUrl = "http://cityhospital.techecosys.net";
const proxyUrl = "https://api.allorigins.win/raw?url=";

baseUrl = proxyUrl + baseUrl;
// Define a global variable (e.g., API base URL)
app.config.globalProperties.$apiBaseUrl = baseUrl;
app.config.globalProperties.$clientUrl ='http://localhost:8080/';
app.config.globalProperties.$apiAccessKey = '123456789';

const head = createHead(); // Create head instance
app.use(router).use(head).mount("#app");

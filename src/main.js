import { createApp } from 'vue';
import App from './App.vue';
import { createHead } from '@vueuse/head';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'bootstrap-icons/font/bootstrap-icons.css';
import '@fortawesome/fontawesome-free/css/all.css';
import 'bootstrap';
import '../src/assets/css/style.css';
import 'aos/dist/aos.css';
import router from './router';

const app = createApp(App);
const head = createHead(); // Create head instance
app.use(router).use(head).mount('#app');

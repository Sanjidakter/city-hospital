import { createApp } from 'vue'
import App from './App.vue'

// Import Bootstrap 5 CSS
import 'bootstrap/dist/css/bootstrap.min.css'
// Optionally import Bootstrap JS (for components that require JavaScript)
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import 'bootstrap-icons/font/bootstrap-icons.css'
import '@fortawesome/fontawesome-free/css/all.css';
import 'bootstrap';
import '../src/assets/css/style.css'
import router from './router'



createApp(App).use(router).mount('#app')

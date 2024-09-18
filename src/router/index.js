import ContactUs from "@/components/Home/ContactUs.vue";
import HomePage from "@/components/Home/HomePage.vue";
import DepartmentDoctor from "@/components/View/DepartmentDoctor.vue";
import DynamicPage from "@/views/DynamicPage.vue";
import { createRouter, createWebHistory } from "vue-router";


const routes = [
  { path: "/", component: HomePage },
  { path: "/contact-us", component: ContactUs },
  { path: '/category/all_department', component: DepartmentDoctor },
  { path: "/:alias", component: DynamicPage, props:true },
  ];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;

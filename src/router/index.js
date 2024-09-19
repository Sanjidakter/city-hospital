import ContactUs from "@/components/Home/ContactUs.vue";
import HomePage from "@/components/Home/HomePage.vue";
import DepartmentDetails from "@/components/View/DepartmentDetails.vue";
import DepartmentDoctor from "@/components/View/DepartmentDoctor.vue";
import DoctorsList from "@/components/View/DoctorsList.vue";
import DynamicPage from "@/views/DynamicPage.vue";
import { createRouter, createWebHistory } from "vue-router";

const routes = [
  { path: "/", component: HomePage },
  { path: "/contact-us", component: ContactUs },
  { path: "/departments", component: DepartmentDoctor },
  {
    path: '/department/:id', // Define the path with the dynamic parameter
    name: 'DepartmentDetails', // Name of the route
    component: DepartmentDetails, // Component to render
    props: true, // Pass route params as props to the component
  },
  {
    path: "/doctors", 
    component: DoctorsList,
  },
  { path: "/:alias", component: DynamicPage, props: true },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;

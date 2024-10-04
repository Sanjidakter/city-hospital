import ContactUs from "@/components/Home/ContactUs.vue";
import HomePage from "@/components/Home/HomePage.vue";
import AllNews from "@/views/AllNews.vue";
import AllServices from "@/views/AllServices.vue";
import BlogList from "@/views/BlogList.vue";
import DepartmentDetails from "@/views/DepartmentDetails.vue";
import DepartmentDoctor from "@/views/DepartmentDoctor.vue";
import DoctorDetails from "@/views/DoctorDetails.vue";
import DoctorsList from "@/views/DoctorsList.vue";
import DynamicPage from "@/views/DynamicPage.vue";
import GalleryPage from "@/views/GalleryPage.vue";
import GalleryPhotos from "@/views/GalleryPhotos.vue";
import MakeAppointment from "@/views/MakeAppointment.vue";
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
    path: "/appointmentt", 
    component: MakeAppointment,
  },
  {
    path: "/doctors", 
    component: DoctorsList,
  },
  {
    path: "/services", 
    component: AllServices,
  },
  {
    path: "/news", 
    component: AllNews,
  },
  {
    path: "/blogs", 
    component: BlogList,
  },
  {
    path: "/gallery", 
    component: GalleryPage,
  },
  {
    path: "/gallery/photos", 
    component: GalleryPhotos,
  },
  {
    path: '/doctors/:id',
    name: 'DoctorDetails',
    component: DoctorDetails,
    props: true, // Pass route params as props
  },
  { path: "/:alias", component: DynamicPage, props: true },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;

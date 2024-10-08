import ContactUs from "@/components/Home/ContactUs.vue";
import HomePage from "@/components/Home/HomePage.vue";
import ContentsPage from "@/views/WebsiteContents.vue";
import DepartmentDetails from "@/views/DepartmentDetails.vue";
import DepartmentDoctor from "@/views/DepartmentDoctor.vue";
import DoctorDetails from "@/views/DoctorDetails.vue";
import DoctorsList from "@/views/DoctorsList.vue";
import GalleryPage from "@/views/GalleryPage.vue";
import GalleryPhotos from "@/views/GalleryPhotos.vue";
import MakeAppointment from "@/views/MakeAppointment.vue";
import SinglePage from "@/views/SinglePage.vue";

import { createRouter, createWebHistory } from "vue-router";

const routes = [
  { path: "/", component: HomePage, props: true },
  { path: "/contact-us", component: ContactUs, props: true },
  { path: "/departments", component: DepartmentDoctor, props: true },
  {
    path: "/department/:alias",
    name: "DepartmentDetails",
    component: DepartmentDetails,
    props: true,
  },
  { path: "/appointment", component: MakeAppointment, props: true },
  { path: "/doctors", component: DoctorsList, props: true },
  { path: "/gallery", component: GalleryPage, props: true },
  { path: "/gallery/photos", component: GalleryPhotos, props: true },
  {
    path: "/doctors/:id",
    name: "DoctorDetails",
    component: DoctorDetails,
    props: true,
  },

  // for Dynamic contents //

  {
    path: "/:contentType",
    name: "ContentList",
    component: ContentsPage,
    props: (route) => ({
      contentType: route.params.contentType,
    }),
  },
  // for detailed view 
  {
    path: "/:contentType/:alias",
    name: "SinglePage",
    component: SinglePage,
    props: true, // pass route params as props
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
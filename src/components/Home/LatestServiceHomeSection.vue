<template>
  <div class="container">
   <swiper
     :slidesPerView="3"
     :spaceBetween="20"
     :loop="true"
     :centeredSlides="true"
     :autoplay="{
       delay: 2500,
       disableOnInteraction: false,
     }"
     :pagination="false"
     :navigation="false"
     :modules="modules"
     class="mySwiper"
   >
     <swiper-slide v-for="(slide, index) in slides" :key="index">
       <div class="testimonial-item">
         <div class="news_section">
           <div class="image_section">
             <img class="img-fluid" :src="slide.image_url" alt="alt" />
           </div>
           <div class="news_title pt-2">
             <h3>{{ slide.title }}</h3>
             <div>
               <p class="text-black">{{ slide.fulltext }}</p>
             </div>
             <a href="#">Read More&gt;&gt;&gt;</a>
           </div>
         </div>
       </div>
     </swiper-slide>
   </swiper>
   <div class="text-center py-5">
     <a class="btn" href="#">All Services </a>
   </div>
  </div>
 </template>
 <script>
 // Import Swiper Vue.js components
 import { Swiper, SwiperSlide } from "swiper/vue";
 
 // Import Swiper styles
 import "swiper/css";
 
 import "swiper/css/pagination";
 import "swiper/css/navigation";
 
 // import required modules
 import { Autoplay, Pagination, Navigation } from "swiper/modules";
 
 export default {
   name: "LatestServiceHomeSection",
   components: {
     Swiper,
     SwiperSlide,
   },
   data() {
     return {
       slides: [],
       widgets: [], // Ensure widgets is defined in the data object
       services: [],
     };
   },
   setup() {
     return {
       modules: [Autoplay, Pagination, Navigation],
     };
   },
   
   async mounted() {
      // Call fetchData when the component is mounted
      await this.fetchData();
    },
    methods: {
      async fetchData() {
        try {
          const storedWidgets = localStorage.getItem("widgets");
  
          if (storedWidgets) {
            console.log("using data from localstorage for home service...");
            this.widgets = JSON.parse(storedWidgets);
            this.services = this.widgets.home_page_block[7];
            this.slides = this.services.items;
          }else{
            console.log("No widgets data in localstorage");
          }
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      },
    },
 };
 </script>
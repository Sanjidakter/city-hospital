<template>
    <section id="gallery" class="gallery section">
      <!-- Section Title -->
      <div class="container section-title aos-init " data-aos="fade-up">
        <h2>Gallery</h2>
        <p>Necessitatibus eius consequatur ex aliquid fuga eum quidem sint consectetur velit</p>
      </div><!-- End Section Title -->
  
      <div class="container aos-init " data-aos="fade-up" data-aos-delay="100">
        <swiper
          :loop="true"
          :speed="600"
          :autoplay="{ delay: 5000 }"
          :slidesPerView="'auto'"
          :centeredSlides="true"
          :pagination="{ clickable: true }"
          :breakpoints="{
            320: { slidesPerView: 1, spaceBetween: 0 },
            768: { slidesPerView: 3, spaceBetween: 20 },
            1200: { slidesPerView: 5, spaceBetween: 20 }
          }"
          :modules="modules"
          class="mySwiper"
        >
          <swiper-slide v-for="(slide, index) in slides" :key="index">
            <a class="glightbox" :data-gallery="'images-gallery'" :href="slide.href">
              <img :src="slide.link" class="img-fluid" alt="">
            </a>
          </swiper-slide>
        </swiper>
      </div>
    </section>
  </template>
  
  <script>
  // Import Swiper Vue.js components
  import { Swiper, SwiperSlide } from "swiper/vue";
  
  // Import Swiper styles
  import "swiper/css";
  import "swiper/css/pagination";
  import "swiper/css/navigation";
  
  // Import required modules
  import { Autoplay, Pagination, Navigation } from "swiper/modules";
  
  export default {
    name: "GalleryHomeSection",
    props: {
    slides: {
      type: Array,
      default: () => [],
    },
  },
    components: {
      Swiper,
      SwiperSlide,
    },
    setup() {
      return {
        modules: [Autoplay, Pagination, Navigation],
      };
    },
  };
  </script>
  
 
  
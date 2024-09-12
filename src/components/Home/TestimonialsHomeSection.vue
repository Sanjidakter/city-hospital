<template>
    <section id="testimonials" class="testimonials section">
      <!-- Section Title -->
      <div class="container section-title aos-init" data-aos="fade-up">
        <h2>Corporate Affiliations</h2>
        <p>Necessitatibus eius consequatur ex aliquid fuga eum quidem sint consectetur velit</p>
      </div><!-- End Section Title -->
  
      <div class="container aos-init" data-aos="fade-up" data-aos-delay="100">
        <swiper
          :loop="true"
          :speed="600"
          :autoplay="{ delay: 5000 }"
          :slidesPerView="'auto'"
          :pagination="{ el: '.swiper-pagination', type: 'bullets', clickable: true }"
          :breakpoints="breakpoints"
          :modules="modules"
          class="mySwiper"
        >
          <swiper-slide v-for="(slide, index) in slides" :key="index">
            <div class="testimonial-item">
              <div class="coporet_img">
                <img :src="slide.image" class="img-fluid" :alt="slide.alt">
              </div>
            </div>
          </swiper-slide>
        </swiper>
        <div class="swiper-pagination"></div>
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
    name: "TestimonialsHomeSection",
    components: {
      Swiper,
      SwiperSlide,
    },
    data() {
      return {
        slides: [
          { image: "https://www.cityhospitalbd.com/uploads/cms/category/13/qrl7UIjlXeuVAHDBKwwIdstM88ihHssA.jpg", alt: "Corporate Image 1" },
          { image: "https://www.cityhospitalbd.com/uploads/cms/category/13/3UeZHKm2dWwdPi8UMc4Prr8eTwepsqMX.jpg", alt: "Corporate Image 2" },
          { image: "https://www.cityhospitalbd.com/uploads/cms/category/13/FxD5w5gkYnlmcJmyvc1RGkeRgmk1IViT.jpg", alt: "Corporate Image 3" },
          { image: "https://www.cityhospitalbd.com/uploads/cms/category/13/WE1IXwqIWTl3zJ5y3GqWF9dlpvYHHaxk.jpg", alt: "Corporate Image 4" },
          { image: "https://www.cityhospitalbd.com/uploads/cms/category/13/3L6ZtwLny3HHVgDiu7yteK7WBPMS8Snf.jpg", alt: "Corporate Image 5" },
          { image: "https://www.cityhospitalbd.com/uploads/cms/category/13/TghUxvwvdUr9B6mviYEwXUr21Qx7UZFJ.jpg", alt: "Corporate Image 6" },
          { image: "https://www.cityhospitalbd.com/uploads/cms/category/13/TghUxvwvdUr9B6mviYEwXUr21Qx7UZFJ.jpg", alt: "Corporate Image 7" },
          { image: "https://www.cityhospitalbd.com/uploads/cms/category/13/sukJt9bSsj8K4PHKl4lSV6nqBYd75jKn.gif", alt: "Corporate Image 8" },
          { image: "https://www.cityhospitalbd.com/uploads/cms/category/13/y88wE2tiPPGxcL4j8Z3hJhXuUGxzzYSu.png", alt: "Corporate Image 9" },
          { image: "https://www.cityhospitalbd.com/uploads/cms/category/13/6BVMPPv2luirkxXwlrZ8Ickfm7MGBTiS.png", alt: "Corporate Image 10" },
          { image: "https://www.cityhospitalbd.com/uploads/cms/category/13/VSerebcHtuuX5pGUiaY54kly55CMcvP9.jpg", alt: "Corporate Image 11" },
          { image: "https://www.cityhospitalbd.com/uploads/cms/category/13/vPb8n3YnFJmYt8NAnhGxkBZRYGQHQW8F.jpg", alt: "Corporate Image 12" },
          { image: "https://www.cityhospitalbd.com/uploads/cms/category/13/nuPQMSXspA9CVLmTlDerCyaeee2hTalN.jpg", alt: "Corporate Image 13" },
          { image: "https://www.cityhospitalbd.com/uploads/cms/category/13/FdcEwIGYxJkd3myHBqIbDPD81tKVfcwG.jpg", alt: "Corporate Image 14" },
          { image: "https://www.cityhospitalbd.com/uploads/cms/category/13/qrl7UIjlXeuVAHDBKwwIdstM88ihHssA.jpg", alt: "Corporate Image 15" },
          { image: "https://www.cityhospitalbd.com/uploads/cms/category/13/3UeZHKm2dWwdPi8UMc4Prr8eTwepsqMX.jpg", alt: "Corporate Image 16" }
        ],
        breakpoints: {
          320: {
            slidesPerView: 1,
            spaceBetween: 40
          },
          1200: {
            slidesPerView: 3,
            spaceBetween: 40
          }
        }
      };
    },
    setup() {
      return {
        modules: [Autoplay, Pagination, Navigation],
      };
    },
  };
  </script>
  

  
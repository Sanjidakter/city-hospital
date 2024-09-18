<template>
  <section id="news" class="news section light-background">
    <div
      class="container section-title aos-init aos-animate"
      data-aos="fade-up"
    >
      <h2>Latest Services</h2>
      <p>
        Necessitatibus eius consequatur ex aliquid fuga eum quidem sint
        consectetur velit
      </p>
    </div>
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
        <swiper-slide v-for="(slide, index) in services" :key="index">
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
                <a :href="slide.url">Read More&gt;&gt;&gt;</a>
              </div>
            </div>
          </div>
        </swiper-slide>
      </swiper>
      <div class="text-center py-5">
        <a class="btn" href="#">All Services </a>
      </div>
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

// import required modules
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import { useHead } from "@vueuse/head";

export default {
  name: "LatestServiceHomeSection",
  components: {
    Swiper,
    SwiperSlide,
  },
  props: {
    services: {
      type: Array,
      default: () => [],
    },
  },
  setup() {
    useHead({
      title: 'Services - City Hospital',
      meta: [
        { name: 'description', content: 'Explore the servicess at City Hospital.' },
        { name: 'keywords', content: 'hospital, departments, medical services' },
      ],
    });
    return {
      modules: [Autoplay, Pagination, Navigation],
    };
    
  },
};
</script>

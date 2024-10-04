<template>
  <section id="news" class="news section light-background">
    <div
      class="container section-title aos-init aos-animate"
      data-aos="fade-up"
    >
      <h2>Latest Services</h2>
      <p>Take a look at our services and choose what's best for you.</p>
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
                <a :href="slide.url">
                  <h3>{{ slide.label }}</h3>
                </a>

                <div>
                  <p class="text-black" v-html="slide.fulltext"></p>
                </div>
                <a :href="slide.url">Read More</a>
              </div>
            </div>
          </div>
        </swiper-slide>
      </swiper>
      <div class="text-center py-5">
        <a class="btn" @click="gotoAllServices">All Services </a>
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
    return {
      modules: [Autoplay, Pagination, Navigation],
    };
  },
  methods: {
    gotoAllServices() {
      localStorage.setItem("services", JSON.stringify(this.services));
      this.$router.push({
        path: "/services",
      });
    },
  },
};
</script>

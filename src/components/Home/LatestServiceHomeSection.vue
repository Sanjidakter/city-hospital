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
            <img class="img-fluid" :src="slide.image" alt="alt" />
          </div>
          <div class="news_title pt-2">
            <h3>{{ slide.title }}</h3>
            <div>
              <p class="text-black">{{ slide.description }}</p>
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
      slides: [
        {
          image:
            "http://cityhospital.techecosys.net/includes/themes/primary/hospital/hospital/assets/img/departments-4.jpg",
          title: "Multi Slice CT Scan Machine in City Hospital Ltd.",
          description: "Diseases   are growing day by day. People are worried about the emergency medical   care. City Hospital Ltd. glad to inform you to provide unparallel,   quality medical service to the people",
        },
        {
          image:
            "http://cityhospital.techecosys.net/includes/themes/primary/hospital/hospital/assets/img/departments-5.jpg",
          title: "Multi Slice CT Scan Machine in City Hospital Ltd.",
          description:
            " Diseases   are growing day by day. People are worried about the emergency medical   care. City Hospital Ltd. glad to inform you to provide unparallel,   quality medical service to the people",
        },
        {
          image:
            "http://cityhospital.techecosys.net/includes/themes/primary/hospital/hospital/assets/img/departments-3.jpg",
          title: "Multi Slice CT Scan Machine in City Hospital Ltd.",
          description:
            " Diseases   are growing day by day. People are worried about the emergency medical   care. City Hospital Ltd. glad to inform you to provide unparallel,   quality medical service to the people",
        },
        {
          image:
            "http://cityhospital.techecosys.net/includes/themes/primary/hospital/hospital/assets/img/departments-4.jpg",
          title: "Multi Slice CT Scan Machine in City Hospital Ltd.",
          description:
            " Diseases   are growing day by day. People are worried about the emergency medical   care. City Hospital Ltd. glad to inform you to provide unparallel,   quality medical service to the people",
        },
        // Add more slides as needed
      ],
    };
  },
  setup() {
    return {
      modules: [Autoplay, Pagination, Navigation],
    };
  },
};
</script>

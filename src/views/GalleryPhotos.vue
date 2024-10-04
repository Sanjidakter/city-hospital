<template>
    <div class="slider-section">
      <h2>{{ albumName }} - Images</h2>
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
        <SwiperSlide v-for="(image, index) in albumImages" :key="index">
          <img :src="image" alt="Image" class="slider-image" />
        </SwiperSlide>
      </Swiper>
      <button @click="goBack" class="close-slider mb-3">Back to Albums</button>
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
    components: {
    Swiper,
    SwiperSlide,
  },
    data() {
      return {
        albumName: "",
        albumImages: [],
      };
    },
    created() {
      const selectedAlbum = JSON.parse(localStorage.getItem("selectedAlbum"));

      if(selectedAlbum){
        this.albumName = selectedAlbum.name;
        this.albumImages = selectedAlbum.images;
      }else{
        this.goBack();
      }
    },
    methods: {
      goBack() {
        this.$router.push("/gallery");
      },
    },
    setup() {
    return {
      modules: [Autoplay, Pagination, Navigation],
    };
  },
  };
  </script>
  
  <style scoped>
  .slider-section {
    margin-top: 30px;
    text-align: center;
  }
  
  .slider-image {
    width: 100%;
    height: auto;
    border-radius: 8px;
  }
  
  .close-slider {
    margin-top: 10px;
    padding: 10px 20px;
    background-color: #00a550;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }
  
  .close-slider:hover {
    background-color: #00a550;
  }
  </style>
  
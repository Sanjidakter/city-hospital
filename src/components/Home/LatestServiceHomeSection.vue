<template>
    <section id="news" class="news section light-background">
      <div class="container section-title" data-aos="fade-up">
        <h2>Latest Services</h2>
        <p>Necessitatibus eius consequatur ex aliquid fuga eum quidem sint consectetur velit</p>
      </div>
      <!-- End Section Title -->
      <div class="container">
        <swiper
          :loop="true"
          :autoplay="{ delay: 5000 }"
          :breakpoints="{
            320: { slidesPerView: 1, spaceBetween: 40 },
            1200: { slidesPerView: 3, spaceBetween: 20 }
          }"
          pagination
          class="mySwiper"
        >
          <swiper-slide v-for="(service, index) in services" :key="index">
            <div class="testimonial-item">
              <div class="news_section">
                <div class="image_section">
                  <img class="img-fluid" :src="service.image" :alt="service.title" />
                </div>
                <div class="news_title pt-2">
                  <h3>{{ service.title }}</h3>
                  <p>{{ service.description }}</p>
                  <a href="#">Read More &gt;&gt;&gt;</a>
                </div>
              </div>
            </div>
          </swiper-slide>
        </swiper>
        <div class="text-center py-5">
          <a class="btn" href="#">All Services</a>
        </div>
      </div>
    </section>
  </template>
  
  <script>
  // Import Swiper core and required modules
import { Swiper, SwiperSlide } from 'swiper/vue';

// Import Swiper styles
import 'swiper/swiper-bundle.css'; // Import the Swiper CSS bundle
  
  export default {
    components: {
    Swiper,
    SwiperSlide,
  },
    data() {
      return {
        services: [
          {
            image: "http://cityhospital.techecosys.net/includes/themes/primary/hospital/hospital/assets/img/departments-1.jpg",
            title: "Multi Slice CT Scan Machine in City Hospital Ltd.",
            description: "Diseases are growing day by day. People are worried about emergency medical care. City Hospital Ltd. is glad to provide unparalleled quality medical service.",
          },
          {
            image: "http://cityhospital.techecosys.net/includes/themes/primary/hospital/hospital/assets/img/departments-4.jpg",
            title: "Advanced MRI Scanning Services",
            description: "State-of-the-art MRI facilities available 24/7. Providing accurate diagnosis for complex conditions.",
          },
          {
            image: "http://cityhospital.techecosys.net/includes/themes/primary/hospital/hospital/assets/img/departments-5.jpg",
            title: "Comprehensive Cardiovascular Care",
            description: "City Hospital offers cutting-edge cardiovascular treatment and surgery with top-notch facilities.",
          },
          // Add more services as needed
        ],
      };
    },
  };
  </script>

g
  
  <style scoped>
  /* Add your component-specific styles here */
  .news {
    padding: 50px 0;
  }
  
  .news_section {
    padding: 20px;
    background-color: #f9f9f9;
    border-radius: 10px;
  }
  
  .news_title h3 {
    font-size: 20px;
    margin-bottom: 10px;
  }
  
  .news_title p {
    font-size: 16px;
  }
  
  .swiper-pagination-bullet-active {
    background-color: #007bff;
  }
  </style>
  
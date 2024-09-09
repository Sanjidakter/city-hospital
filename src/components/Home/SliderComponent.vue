<template>
    <div class="slider-container">
      <h1>Slider</h1>
      <!-- {{ sliderItems }} -->
      <div
        v-if="sliderItems.length > 0"
        id="carouselExampleControls"
        class="carousel slide"
        data-bs-ride="carousel"
      >
        <div class="carousel-inner">
          <div
            v-for="(item, index) in sliderItems"
            :key="item.id"
            class="carousel-item"
            :class="{ active: index === 0 }"
          >
            <!-- Correctly set the image source here -->
            <img :src="item.imageUrl" class="d-block w-100" :alt="item.title" />
            <div class="carousel-caption d-none d-md-block bg-white text-black">
              <h5>{{ item.title }}</h5>
              <p>{{ item.alias }}</p>
              <a :href="item.url" class="btn btn-primary">Read More</a>
            </div>
          </div>
        </div>
  
        <button
          class="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExampleControls"
          data-bs-slide="prev"
        >
          <span class="carousel-control-prev-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Previous</span>
        </button>
        <button
          class="carousel-control-next"
          type="button"
          data-bs-target="#carouselExampleControls"
          data-bs-slide="next"
        >
          <span class="carousel-control-next-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Next</span>
        </button>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: "SliderComponent",
    data() {
      return {
        widgets: null,
        sliderItems: [], // Holds the slider items fetched from the API or localStorage
      };
    },
    mounted() {
      this.loadSliderItems();
    },
    methods: {
      loadSliderItems() {
        const baseUrl = process.env.VUE_APP_BASE_API_URL || "http://cityhospital.techecosys.net"; // Make sure to check env variable
  
        // Check if widgets are stored in localStorage
        const storedWidgets = localStorage.getItem("widgets");
  
        if (storedWidgets) {
          try {
            this.widgets = JSON.parse(storedWidgets);
  
            // Check if the slider exists inside widgets data
            if (this.widgets && this.widgets.slider && this.widgets.slider["0"] && this.widgets.slider["0"].items) {
              // Extract and map the slider items to the component's data structure
              const sliderItemsArray = this.widgets.slider["0"].items;
  
              this.sliderItems = sliderItemsArray.map((item) => ({
                id: item.id,
                title: item.title,
                imageUrl: `${baseUrl}/${item.image}`, // Combine base URL with image path
                alias: item.alias,
                url: `${baseUrl}/${item.url}`, // Ensure URL is absolute
              }));
            } else {
              console.error("Slider data is missing or malformed in widgets");
            }
          } catch (error) {
            console.error("Error parsing widgets from localStorage:", error);
          }
        } else {
          console.error("No widgets found in localStorage");
        }
      },
    },
  };
  </script>
  
  <style scoped>
  .slider-container {
    max-width: 1200px;
    margin: 0 auto;
  }
  
  .carousel-item img {
    height: 500px;
    object-fit: cover;
  }
  </style>
  
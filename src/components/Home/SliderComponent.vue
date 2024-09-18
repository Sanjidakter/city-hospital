<template>
  <section id="hero" class="hero section">
    <div
      id="hero-carousel"
      class="carousel slide carousel-fade"
      data-bs-ride="carousel"
      data-bs-interval="5000"
    >
      <div
        v-for="(item, index) in sliderItems"
        :key="item.id"
        class="carousel-item"
        :class="{ active: index === 0 }"
      >
        <!-- Image with correct binding -->
        <img :src="item.imageUrl" class="d-block w-100" :alt="item.title" />
      </div>

      <a
        class="carousel-control-prev"
        href="#hero-carousel"
        role="button"
        data-bs-slide="prev"
      >
        <span
          class="carousel-control-prev-icon bi bi-chevron-left"
          aria-hidden="true"
        ></span>
      </a>

      <a
        class="carousel-control-next"
        href="#hero-carousel"
        role="button"
        data-bs-slide="next"
      >
        <span
          class="carousel-control-next-icon bi bi-chevron-right"
          aria-hidden="true"
        ></span>
      </a>

      <ol class="carousel-indicators">
        <li
          data-bs-target="#hero-carousel"
          data-bs-slide-to="0"
          class="active"
          aria-current="true"
        ></li>
        <li data-bs-target="#hero-carousel" data-bs-slide-to="1" class=""></li>
        <li data-bs-target="#hero-carousel" data-bs-slide-to="2" class=""></li>
      </ol>
    </div>
  </section>
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
      const baseUrl =
        process.env.VUE_APP_BASE_API_URL ||
        "http://cityhospital.techecosys.net"; // Make sure to check env variable

      // Check if widgets are stored in localStorage
      const storedWidgets = localStorage.getItem("widgets");

      if (storedWidgets) {
        try {
          this.widgets = JSON.parse(storedWidgets);

          // Check if the slider exists inside widgets data
          if (
            this.widgets &&
            this.widgets.slider &&
            this.widgets.slider["0"] &&
            this.widgets.slider["0"].items
          ) {
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
          // console.log(this.sliderItems);
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
  height: 100%;
  object-fit: cover;
}
</style>

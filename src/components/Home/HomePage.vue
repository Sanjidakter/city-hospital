<template>
  <div>
    <HeroSection />
    <SliderComponent/>
    <NoticesSection />
    
    <!-- Dynamic Sections -->
    <div v-if="homePageBlockItems.length">
      <div v-for="(block) in homePageBlockItems" :key="block.id" class="home-page-block">
        <DynamicSection :block="block" />
      </div>
    </div>

    <div v-else>
      <p>No content available for home page blocks</p>
    </div>

  </div>
</template>

<script>
import HeroSection from './HeroSection.vue';
import SliderComponent from './SliderComponent.vue';
import NoticesSection from './NoticesSection.vue';
import DynamicSection from './DynamicSection.vue'; // New component to handle dynamic blocks


export default {
  name: "HomePage",
  components: {
    HeroSection,
    SliderComponent,
    NoticesSection,
    DynamicSection,
    
  },
  data() {
    return {
      widgets: null,
      homePageBlockItems: [], // Array to hold block items
    };
  },
  mounted() {
    // Check if widgets are stored in localStorage
    const storedWidgets = localStorage.getItem("widgets");

    if (storedWidgets) {
      try {
        this.widgets = JSON.parse(storedWidgets);
        
        // Check if home_page_block exists and is an object
        if (this.widgets && this.widgets.home_page_block) {
          // Convert object values to an array before mapping
          const homePageBlockItemsArray = Object.values(this.widgets.home_page_block);

          this.homePageBlockItems = homePageBlockItemsArray.map((item) => ({
            id: item.id,
            alias: item.alias,
            title: item.title,
            description: item.description,
            children: item.items || [], // Include children for dropdown
          }));
        }
      } catch (error) {
        console.error("Error parsing widgets:", error);
      }
    }
  }
};
</script>

<style scoped>
.home-page-block {
  margin-bottom: 20px;
}
</style>

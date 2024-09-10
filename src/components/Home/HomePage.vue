<template>
  <div class="homepage-bg">
    <SliderComponent />
    <NoticesSection />

    <!-- Dynamic Sections -->
    <div class="homepage-bg" v-if="homePageBlockItems.length">
      <div v-for="(block) in homePageBlockItems" :key="block.id" class="home-page-block">
        <!-- Dynamically render component based on alias -->
        <component :is="block.component" :block="block" />
      </div>
    </div>

    <div v-else>
      <p>No content available for home page blocks</p>
    </div>
  </div>
</template>

<script>
import SliderComponent from './SliderComponent.vue';
import NoticesSection from './NoticesSection.vue';
import DefaultSection from './DefaultSection.vue';

export default {
  name: "HomePage",
  components: {
    SliderComponent,
    NoticesSection,
    DefaultSection,
  },
  data() {
    return {
      homePageBlockItems: [], // Array to hold block items
    };
  },
  async mounted() {
    // Check if widgets are stored in localStorage
    const storedWidgets = localStorage.getItem("widgets");

    if (storedWidgets) {
      try {
        const widgets = JSON.parse(storedWidgets);

        // Check if home_page_block exists and is an object
        if (widgets && widgets.home_page_block) {
          // Convert home_page_block object into an array
          const homePageBlockItemsArray = Object.values(widgets.home_page_block);

          // Map items and load components asynchronously
          this.homePageBlockItems = await Promise.all(homePageBlockItemsArray.map(async (item) => {
            const component = await this.getComponent(item.widget_element_path);
            return {
              id: item.id,
              alias: item.alias,
              widget_element_path: item.widget_element_path,
              title: item.title,
              description: item.description,
              children: item.items || [], // Include children for dropdown
              component
            };
          }));
        }
      } catch (error) {
        console.error("Error parsing widgets:", error);
      }
    }
  },
  methods: {
  async getComponent(widget_element_path) {
    console.log(`Getting the component for path: ${widget_element_path}`);

    try {
      // Dynamically import the component using the provided widget_element_path
      const component = await import(`./${widget_element_path}.vue`);
      console.log(`Component imported successfully:`, component);

      // Check if component has default export
      if (component.default) {
        console.log('Rendering component:', component.default);
        return component.default;
      } else {
        console.warn('No default export found, falling back to DefaultSection');
        return DefaultSection;
      }
    } catch (error) {
      console.warn(`Component "${widget_element_path}" not found. Rendering DefaultSection instead.`);
      return DefaultSection;
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

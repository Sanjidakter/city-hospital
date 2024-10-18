<template>
  <div class="homepage-bg">
    <SliderComponent />
    <NoticesSection />
    

    <!-- Dynamic Sections -->
    <div class="homepage-bg" v-if="homePageBlockItems.length">
      <div v-for="(block) in homePageBlockItems" :key="block.id" class="home-page-block">
        <!-- Conditionally render LatestNewsHomeSection or raw HTML description -->
        <component
          v-if="block.widget_element_path === 'LatestNewsHomeSection' ||
                 block.widget_element_path === 'LatestServiceHomeSection' ||
                 block.widget_element_path === 'DoctorsHomeSection' ||
                 block.widget_element_path === 'StatsHomeSection' ||
                 block.widget_element_path === 'GalleryHomeSection'"
          :is="block.component"
          :title="block.title"
          :description="block.description"
          :news="block.widget_element_path === 'LatestNewsHomeSection' ? (console.log('News:', block.items), block.items) : []"
          :services="block.widget_element_path === 'LatestServiceHomeSection' ? (console.log('services:', block.items), block.items) : []"
          :departments="block.widget_element_path === 'DoctorsHomeSection' ? (console.log('departments:', block.items), block.items) : []"
          :slides="block.widget_element_path === 'GalleryHomeSection' ? (console.log('slides:', block.items), block.items) : []"
        />
        <div v-else v-html="block.description"></div>
      </div>
    </div>

    <div v-else>
      <p>No content available for home page blocks</p>
      <DefaultSection />
    </div>
  </div>
</template>

<script>
import SliderComponent from './SliderComponent.vue';
import NoticesSection from './NoticesSection.vue';
import DefaultSection from './DefaultSection.vue';
import LatestNewsHomeSection from './LatestNewsHomeSection.vue'; // Import LatestNewsHomeSection
import GalleryHomeSection from './GalleryHomeSection.vue';
import LatestServiceHomeSection from './LatestServiceHomeSection.vue';
import DoctorsHomeSection from './DoctorsHomeSection.vue';
import StatsHomeSection from './StatsHomeSection.vue';
import { markRaw } from 'vue';
import { useHead } from '@vueuse/head';

export default {
  name: "HomePage",
  components: {
    SliderComponent,
    NoticesSection,
    DefaultSection,
    LatestNewsHomeSection ,
    LatestServiceHomeSection
  },
  data() {
    return {
      homePageBlockItems: [], // Array to hold block items
    };
  },
  setup() {
    useHead({
      title: 'Home',
      meta: [
        { name: 'description', content: 'Explore latest news of City Hospital.' },
        { name: 'keywords', content: 'news, hospital, departments, medical services' },
      ],
    });
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
              component,
              items:item.items || []
            };
          }));
          console.log("homepageblockitems",this.homePageBlockItems);
        }
      } catch (error) {
        console.error("Error parsing widgets:", error);
      }
    }
  },
  methods: {
    async getComponent(widget_element_path) {
      // Special case for LatestNewsHomeSection
      if (widget_element_path === 'LatestNewsHomeSection') {
        return markRaw(LatestNewsHomeSection);
      }
      if (widget_element_path === 'LatestServiceHomeSection') {
        return markRaw(LatestServiceHomeSection);
      }
      if (widget_element_path === 'GalleryHomeSection') {
        return markRaw(GalleryHomeSection);
      }
      if (widget_element_path === 'DoctorsHomeSection') {
        return markRaw(DoctorsHomeSection);
      }
      if (widget_element_path === 'StatsHomeSection') {
        return markRaw(StatsHomeSection);
      }

      try {
        // Dynamically import the component using the provided widget_element_path
        const component = await import(`./${widget_element_path}.vue`);

        // Check if component has default export
        if (component.default) {
          return component.default;
        } else {
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

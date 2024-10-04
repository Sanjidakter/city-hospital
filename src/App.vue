<template>
 
  <div v-if="loading" class="loading-spinner">
    Loading...
  </div>
  <div v-else>
    <NavBar />
    <router-view />
    <FooterElement />
  </div>
</template>

<script>
import AOS from "aos";
import "aos/dist/aos.css";
import FooterElement from "./components/Shared/FooterElement.vue";
import NavBar from "./components/Shared/NavBar.vue";

export default {
  name: "App",
  components: {
    NavBar,
    FooterElement,
  },
  data() {
    return {
      widgets: [], // Store widgets data
      loading: true, // Loading state for spinner
    };
  },
  async mounted() {
    // Call fetchData only if it is the first visit in this session
    if (!localStorage.getItem("firstVisit")) {
      await this.fetchData();
      // Set a flag to mark that the data was fetched for the first time in this session
      localStorage.setItem("firstVisit", "true");
    } else {
      // If the user revisits within the same session, use localStorage data directly
      this.widgets = JSON.parse(localStorage.getItem("widgets"));
      this.loading = false;
    }

    // Initialize AOS for animations
    AOS.init({
      duration: 600,
      easing: "ease-in-out",
      once: true,
      mirror: false,
    });
  },
  updated() {
    AOS.refresh(); // Refresh AOS on component updates
  },
  methods: {
  async fetchData() {
    try {
      const storedWidgets = localStorage.getItem("widgets");
      let parsedStoredWidgets = storedWidgets ? JSON.parse(storedWidgets) : null;

      if (parsedStoredWidgets) {
        console.log("Using data from localStorage...");
        this.widgets = parsedStoredWidgets; // Set data from localStorage
        this.loading = false; // Stop loading
      } else {
        console.log("No data in localStorage, fetching from API...");
      }

      // Use global properties for base URL and access key
      const baseUrl = this.$apiBaseUrl; // Get base URL from global property
      const accessKey = this.$apiAccessKey; // Get access key from global property
      const url = `${baseUrl}/website/website_api/settings?access_key=${accessKey}`;

      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();

      // Compare fetched data with localStorage data
      if (
        !parsedStoredWidgets || // No data in localStorage
        JSON.stringify(parsedStoredWidgets) !== JSON.stringify(data.widgets) // Data mismatch
      ) {
        console.log("Data has changed, updating localStorage...");
        localStorage.setItem("widgets", JSON.stringify(data.widgets)); // Update localStorage with new data
        this.widgets = data.widgets; // Set the new data
      } else {
        console.log("Data is the same, no need to update localStorage.");
      }

      this.loading = false; // Stop loading after the fetch is complete
    } catch (error) {
      console.error("Error fetching data:", error);
      this.loading = false; // Stop loading even if there's an error
    }
  },
},

};
</script>

<style>
.loading-spinner {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  font-size: 2em;
  color: #333;
}
</style>

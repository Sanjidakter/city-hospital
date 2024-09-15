<template>
  <NavBar />
  <!-- <MainComponent componentName="DynamicSection" /> -->
  <router-view />
  <FooterElement />
</template>

<script>
import  AOS  from "aos";
import "aos/dist/aos.css";
import FooterElement from "./components/Shared/FooterElement.vue";
import NavBar from "./components/Shared/NavBar.vue";
// import MainComponent from "./components/MainComponent.vue";

export default {
  name: "App",
  components: {
    // MainComponent,
    NavBar,
    FooterElement,
  },
  data() {
    return {
      widgets: [], // Ensure widgets is defined in the data object
    };
  },
  async mounted() {
    // Call fetchData when the component is mounted
    await this.fetchData();

    // Initialize AOS after the component is mounted
    AOS.init({
      duration: 600, // Customize the duration of animations
      easing: "ease-in-out", // Customize the easing function
      once: true, // Animations will occur only once
      mirror: false, // Disable animation when scrolling back
    });
    // console.log("AOS Initialized");
  },
  updated() {
    AOS.refresh(); // Refresh AOS on component updates
  },
  methods: {
    async fetchData() {
      try {
        const storedWidgets = localStorage.getItem("widgets");

        console.log("Fetching data from API...");
        const baseUrl = "http://cityhospital.techecosys.net";
        let proxyUrl = "https://api.allorigins.win/raw?url=";
        let url =
          proxyUrl +
          encodeURIComponent(
            `${baseUrl}/website/website_api/settings?access_key=123456789`
          );

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

        // Compare API data with localStorage data
        if (storedWidgets) {
          const parsedWidgets = JSON.parse(storedWidgets);

          // Compare stringified versions of the data to avoid deep object comparison
          if (JSON.stringify(parsedWidgets) !== JSON.stringify(data.widgets)) {
            console.log("Data has changed, updating localStorage...");
            localStorage.setItem("widgets", JSON.stringify(data.widgets));
            this.widgets = data.widgets;
          } else {
            console.log(
              "Data is the same as in localStorage, no update needed."
            );
            this.widgets = parsedWidgets;
          }
        } else {
          // If no data in localStorage, set it
          console.log("No data in localStorage, setting new data...");
          localStorage.setItem("widgets", JSON.stringify(data.widgets));
          this.widgets = data.widgets;
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    },
  },
};
</script>

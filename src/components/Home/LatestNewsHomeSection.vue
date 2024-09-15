<template>
  <section id="news" class="news section">
    <div class="container section-title aos-init" data-aos="fade-up">
      <h2>Latest News</h2>
    </div>
    <!-- End Section Title -->
    <div class="container">
      <div class="row gp-4">
        <div
          v-for="item in news.items"
          :key="item.id"
          class="col-lg-4 col-md-4 aos-init"
          data-aos="fade-up"
        >
          <div class="news_section">
            <div class="image_section">
              <img class="img-fluid" :src="item.image_url" :alt="item.title" />
            </div>
            <div class="news_title pt-2">
              <h3>{{ item.title }}</h3>
              <div class="">
                <p>{{ item.fulltext }}</p>
              </div>
              <a :href="item.link">Read More&gt;&gt;&gt;</a>
            </div>
          </div>
        </div>
      </div>
      <div class="text-center py-5">
        <a class="btn" href="/category/news">All News </a>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "LatestNewsHomeSection",
  data() {
    return {
      widgets: [], // Ensure widgets is defined in the data object
      news: [],
    };
  },
  async mounted() {
    // Call fetchData when the component is mounted
    await this.fetchData();
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
              "Data is the same as in localStorage, no update needed.",
              data.widgets.home_page_block[6].items
            );
            this.widgets = parsedWidgets;
          }
          this.news = data.widgets.home_page_block[6];
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

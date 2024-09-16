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
              <a :href="item.url">Read More&gt;&gt;&gt;</a>
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
        if (storedWidgets) {
          this.widgets = JSON.parse(storedWidgets);
          this.news = this.widgets.home_page_block[6];
        } else {
          console.log("No widgets data in localstorage for home news section");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    },
  },
};
</script>

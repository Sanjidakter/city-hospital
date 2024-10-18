<template>
  <section id="news" class="news section">
    <div
      class="container section-title aos-init aos-animate"
      data-aos="fade-up"
    >
      <h2>Latest News</h2>
      <p>Know What's new happening in our hospital on this section.</p>
    </div>
    <!-- End Section Title -->

    <div class="container">
      <div class="row gp-4">
        <div
          v-for="(newsItem, index) in news"
          :key="index"
          class="news-card col-lg-4 col-md-4 aos-init aos-animate"
          data-aos="fade-up"
        >
          <div class="news_member">
            <div class="news_img">
              <img
                class="img-fluid"
                style="width: 100%; height: 300px"
                :src="`${newsItem.image_url}`"
                alt="alt"
              />
            </div>
            <div class="team_details text-center">
              <a :href="'news/' + newsItem.alias">
                <h4
                  style="
                    color: white;
                    font-family: Montserrat;
                    font-weight: 600;
                    font-size: 16px;
                    display: -webkit-box;
                    -webkit-line-clamp: 2; /* Limit to 2 lines */
                    -webkit-box-orient: vertical;
                    overflow: hidden;
                    text-overflow: ellipsis;
                  "
                >
                  {{ newsItem.title }}
                </h4>
              </a>
              <div class="text-center button_profile py-3">
                <a
                  @click.prevent="goToNewsDetails(newsItem.alias)"
                  class="btn btn-main btn-icon btn-round-full"
                >
                  Read More
                </a>
              </div>
            </div>
          </div>

          <div class="mt-4">
            <p v-html="truncateText(newsItem.fulltext, 50)"></p>
          </div>
        </div>
      </div>
      <div class="text-center py-5">
        <a class="all-btn" @click="gotoAllNews">All News</a>
      </div>
    </div>
  </section>
</template>
<script>
export default {
  name: "LatestNewsHomeSection",
  props: {
    news: {
      type: Array,
      default: () => [],
    },
  },
  methods: {
    goToNewsDetails(alias) {
      this.$router.push({
        name: "SinglePage",
        params: { contentType: "news", alias: alias },
      });
    },
    gotoAllNews() {
      this.$router.push({
        path: "/news",
      });
    },
    truncateText(html, wordLimit) {
      const div = document.createElement("div");
      div.innerHTML = html;
      const textContent = div.textContent || div.innerText || "";

      const words = textContent.split(/\s+/);
      if (words.length > wordLimit) {
        const truncated = words.slice(0, wordLimit).join(" ") + "...";
        return truncated;
      }
      return html;
    },
  },
};
</script>

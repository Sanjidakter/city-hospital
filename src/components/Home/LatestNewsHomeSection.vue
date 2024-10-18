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
          class="col-lg-4 col-md-4 aos-init aos-animate"
          data-aos="fade-up"
        >
          <div class="news_section">
            <div class="image_section">
              <img class="img-fluid" :src="newsItem.image_url" alt="alt" />
            </div>
            <div class="news_title pt-2">
              <a :href="newsItem.url"
                ><h3>{{ newsItem.title }}</h3></a
              >

              <div>
                <p v-html="newsItem.fulltext"></p>
              </div>
              <a @click.prevent="gotoNewsDetails(newsItem.alias)">Read More</a>
            </div>
          </div>
        </div>
      </div>
      <div class="text-center py-5">
        <a class="btn" @click.prevent="gotoAllNews(news)" href="/news">All News</a>
      </div>
    </div>
  </section>
</template>
<script>

import SinglePage from '@/views/SinglePage.vue';

export default {
  name: "LatestNewsHomeSection",
  props: {
    news: {
      type: Array,
      default: () => [],
    },
  },
  methods: {
    gotoAllNews(contentType) {
    localStorage.setItem("news", JSON.stringify(this.news));
    this.$router.push({
      path: "/news",
      query: { contentType: contentType }  // Pass as query instead of params
    });
  },
    gotoNewsDetails(alias){
      this.$router.push({
        name:SinglePage,
        params:{contentType:"news",alias:alias}
      });
    },
  },
};
</script>

<template>
  <section id="news" class="news section">
    <div
      class="container section-title aos-init aos-animate"
      data-aos="fade-up"
    >
      <h2>Latest News</h2>
      <p>
        Necessitatibus eius consequatur ex aliquid fuga eum quidem sint
        consectetur velit
      </p>
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
              <h3>{{ newsItem.title }}</h3>
              <div>
                <p>{{ newsItem.fulltext }}</p>
              </div>
              <a :href="newsItem.url">Read More&gt;&gt;&gt;</a>
            </div>
          </div>
        </div>
      </div>
      <div class="text-center py-5">
        <a class="btn" href="#">All News</a>
      </div>
    </div>
  </section>
</template>
<script>
import { useHead } from '@vueuse/head';


export default {
  name: "LatestNewsHomeSection",
  props: {
    news: {
      type: Array,
      default: () => [],
    },
  },
  setup() {
    useHead({
      title: 'News - City Hospital',
      meta: [
        { name: 'description', content: 'Explore latest news of City Hospital.' },
        { name: 'keywords', content: 'news, hospital, departments, medical services' },
      ],
    });
  },
};
</script>

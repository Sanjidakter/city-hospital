<template>
  <PageTitle :title="contentType" :type="contentType" />
  <section class="section">
    <div class="container mt-2">
      <div class="row border m-3" v-for="item in items" :key="item.id">
        <div class="col-md-4 col-sm-12 my-2">
          <img
            :src="item.image_url"
            class="img-fluid"
            :alt="item.title"
            :title="item.title"
          />
        </div>
        <div class="col-md-8 col-sm-12 my-2">
          <div class="details p-2">
            <h3>
              <a :href="'/' + contentType + '/' + item.alias">{{
                item.title
              }}</a>
            </h3>
            <p>{{ item.fulltext }}</p>
            <p><strong>Publish Date: </strong>{{ item.publish_date }}</p>
            <router-link
              :to="{
                name: 'SinglePage',
                params: { alias: item.alias, contentType: contentType },
              }"
              class="btn btn-main btn-icon btn-round-full"
            >
              Read More <i class="icofont-simple-right ml-2"></i>
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import PageTitle from './PageTitle.vue';

export default {

  components: {
    PageTitle,
  },
    props: {
    contentType: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      localContentType: this.contentType || 'default',  // Create a local copy
      items: [],
    };
  },
  methods: {
    async fetchContent() {
      try {
        let url =
          this.$apiBaseUrl +
          `/website/website_api/contents/${this.localContentType}?access_key=${this.$apiAccessKey}&debug=1`;

        const response = await fetch(url);
        if (!response.ok)
          throw new Error(
            `Error fetching ${this.localContentType}: ${response.status}`
          );

        const result = await response.json();
        this.items = result.contents;
      } catch (error) {
        console.error(`Error fetching ${this.localContentType}:`, error);
      }
    },
  },
  mounted() {
    const contentTypeFromStorage = localStorage.getItem("contentType");
    if (contentTypeFromStorage) {
      this.localContentType = contentTypeFromStorage;
    }
    this.fetchContent();
  },
};
</script>
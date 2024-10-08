<template>
  <div v-if="content">
      <PageTitle :title="content.title" :type="contentType" :alias="alias" :ShowAlias="true" />

    <div class="container">
      <div class="content-details">
        <div class="">
          <img :src="content.image_url" :alt="content.title" :title="content.title">
        </div>

        <h1>{{ content.title }}</h1>
        <div v-html="content.fulltext"></div>
      </div>
    </div>
  </div>

  <div v-else>
    <p>Loading...</p>
  </div>
</template>

<script>
import PageTitle from './PageTitle.vue';

export default {
  components: {
  PageTitle,
},
  props: ["alias", "contentType"],
  data() {
    return {
      content: null,
      error: null
    };
  },
  created() {
    this.fetchSinglePage();
  },watch: {
    alias(newAlias, oldAlias) {
      if (newAlias !== oldAlias) {
        this.fetchSinglePage(); // Refetch content when alias changes
      }
    },
  },
  methods: {
    async fetchSinglePage() {
      try {
        // const response = await fetch(
        //   `${this.$apiBaseUrl}/website/website_api/content/${this.contentType}/${this.alias}?access_key=${this.$apiAccessKey}&debug=1`
        // );
        const response = await fetch(
          `${this.$apiBaseUrl}/website/website_api/content/${this.alias}?access_key=${this.$apiAccessKey}&debug=1`
        );
        const data = await response.json();
        console.log("content",data);
        if (response.ok) {
          this.content = data.content;
        } else {
          this.error = data.message || `Error fetching ${this.contentType} details`;
        }
      } catch (err) {
        this.error = "Network error, please try again later.";
        console.error(err);
      }
    }
  }
};
</script>
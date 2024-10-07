<template>
  <PageTitle
    :title="contentType.title"
    :type="contentType"
    :alias="alias"
    :ShowAlias="true"
  />
</template>

<script>
import PageTitle from "./PageTitle.vue";

export default {
  name: "SinglePage",
  components: {
    PageTitle,
  },
  data() {
    return { content: null, error: null };
  },
  props: ["alias", "contentType"],
  methods: {
    async fetchSinglePAge() {
      try {
        const response = await fetch(
          this.$apiBaseUrl +
            `/website/website_api/content/${this.alias}?access_key=${this.$apiAccessKey}&debug=1`
        );

        const data = response.json();
        console.log("content", data);
        if (response.ok) {
          this.content = data.content;
        } else {
          this.error =
            data.message || `Error fetching ${this.contentType} details`;
        }
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>

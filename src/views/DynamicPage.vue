<template>
  <div>
    <div class="page_title">
      <div class="container">
        <div class="row">
          <div class="col-md-12 pt-2">
            <h3 class="font-weight-bold">{{ $route.params.alias }}</h3>
            <ul class="breadcrumb">
              <li class="breadcrumb-item">
                <a href="http://cityhospital.techecosys.net/">Home </a>
                <span class="divider">&nbsp;</span>
              </li>
              <li class="breadcrumb-item">
                <a href="http://cityhospital.techecosys.net/pages">Pages</a>
                <span class="divider">&nbsp;</span>
              </li>
              <li class="breadcrumb-item">
                {{ $route.params.alias }}
                <span class="divider-last">&nbsp;</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>

    <!-- Display the matching item details -->
    <div class="container" v-if="matchingItem">
      <!-- Display the fetched fulltext content -->
      <div v-html="fetchedContent"></div>
    </div>
    <p v-else>No matching item found for this alias.</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      childrenItems: [], // Array to hold child items
      matchingItem: null, // The matching child item
      fetchedContent: "", // Data fetched from the link
    };
  },
  async mounted() {
    this.loadPageContent(); // Load content when component is mounted
  },
  watch: {
    '$route.params.alias': {
      immediate: true, // Watch and load content immediately
      handler() {
        this.loadPageContent(); // Load content whenever the route changes
      }
    }
  },
  methods: {
    async loadPageContent() {
      const storedWidgets = localStorage.getItem("widgets");

      if (storedWidgets) {
        try {
          const widgets = JSON.parse(storedWidgets);

          if (widgets && widgets.menu && widgets.menu.main_menu) {
            const childrenItemsArray = widgets.menu.main_menu.flatMap(
              (item) => item.children || []
            );

            const baseUrl = "http://cityhospital.techecosys.net";
            let proxyUrl = "https://api.allorigins.win/raw?url=";
            this.childrenItems = childrenItemsArray.map((child) => ({
              id: child.id,
              parentId: child.parentId,
              alias: child.alias,
              label: child.label,
              link: child.link,
              url: proxyUrl + encodeURIComponent(
                `${baseUrl}/website/website_api/content/${child.link}?access_key=123456789&debug=1`
              ),
            }));

            this.matchingItem = this.childrenItems.find((child) => {
              return child.link === this.$route.params.alias;
            });

            if (this.matchingItem && this.matchingItem.url) {
              try {
                const response = await fetch(this.matchingItem.url);
                if (!response.ok) {
                  throw new Error(`HTTP error! Status: ${response.status}`);
                }
                const jsonResponse = await response.json();
                this.fetchedContent = jsonResponse.content.fulltext; // Extract fulltext from JSON
              } catch (error) {
                console.error("Error fetching content:", error);
              }
            }
          }
        } catch (error) {
          console.error("Error parsing widgets:", error);
        }
      }
    }
  }
};
</script>

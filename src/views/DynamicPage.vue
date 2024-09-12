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
                {{ $route.params.alias
                }}<span class="divider-last">&nbsp;</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <h2>Dynamic Page for {{ $route.params.alias }}</h2>
    <p>
      This is the content for the page with alias: {{ $route.params.alias }}
    </p>

    <!-- Display the matching item details -->
    <div v-if="matchingItem">
      <h3>Details for Alias: {{ matchingItem.alias }}</h3>
      <p>ID: {{ matchingItem.id }}</p>
      <p>Parent ID: {{ matchingItem.parentId }}</p>
      <p>Label: {{ matchingItem.label }}</p>
      <p>
        Link: <a :href="matchingItem.url">{{ matchingItem.url }}</a>
      </p>
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
    };
  },
  async mounted() {
    // Check if widgets are stored in localStorage
    const storedWidgets = localStorage.getItem("widgets");

    if (storedWidgets) {
      try {
        const widgets = JSON.parse(storedWidgets);

        // Check if home_page_block exists and is an object
        if (widgets && widgets.menu && widgets.menu.main_menu) {
          // Extract and process children items
          const childrenItemsArray = widgets.menu.main_menu.flatMap(
            (item) => item.children || []
          );

          // Map the children items to an array
          this.childrenItems = childrenItemsArray.map((child) => ({
            id: child.id,
            parentId: child.parentId, // Ensure this field is present in your data
            alias: child.alias,
            label: child.label,
            link: child.link,
            url: `${child.link}`,
          }));

          console.log(this.childrenItems);

          // Find the child item where the alias matches the route alias
          this.matchingItem = this.childrenItems.find((child) => {
            // Log child.alias and this.$route.params.alias
            console.log("Child Alias:", child.link);
            console.log("Route Alias:", this.$route.params.alias);

            // Return the comparison result
            return child.link === this.$route.params.alias;
          });
        }
      } catch (error) {
        console.error("Error parsing widgets:", error);
      }
    }
  },
};
</script>

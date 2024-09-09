<template>
  <header class="sticky-top">
    <div class="header">
      <div class="branding d-flex align-items-center">
        <div
          class="container position-relative d-flex align-items-center justify-content-end"
        >
        <!-- {{ menuItems }} -->
          <nav id="navmenu" class="navmenu d-flex align-items-center me-auto">
            <ul>
              <!-- Loop through menu items -->
              <li v-for="item in menuItems" :key="item.id" class="nav-item" :class="{ dropdown: item.children && item.children.length > 0 }">
                <!-- If the item has children, show dropdown -->
                <template v-if="item.children && item.children.length > 0">
                  <a
                    href="#"
                    class="nav-link dropdown-toggle"
                    data-bs-toggle="dropdown"
                    role="button"
                    aria-expanded="false"
                  >
                    {{ item.label }}
                  </a>
                  <ul class="dropdown-menu">
                    <li
                      v-for="child in item.children"
                      :key="child.id"
                      class="dropdown-item"
                    >
                      <router-link :to="`/${child.link}`">{{ child.label }}</router-link>
                    </li>
                  </ul>
                </template>

                <!-- Otherwise, show a regular menu item -->
                <template v-else>
                  <router-link :to="`/${item.link}`" class="nav-link">{{
                    item.label
                  }}</router-link>
                </template>
              </li>
            </ul>
            <i class="mobile-nav-toggle d-xl-none bi bi-list"></i>
          </nav>

          <a class="cta-btn" href="#">Call for Appointment</a>
          <a
            class="cta-btn btn_white"
            href="http://cityhospital.techecosys.net//post/110/our-doctors"
            >Find a Doctor</a
          >
        </div>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  name: "HeaderPart",
  data() {
    return {
      widgets: null,
      menuItems: [], // Array to hold menu items
    };
  },
  methods: {
    // async fetchData() {
    //   try {
    //     const storedWidgets =localStorage.getItem("widgets");

    //     if (storedWidgets) {
    //       console.log("Loaded from localStorage");
    //      this.widgets = JSON.parse(storedWidgets);
    //     } else {
    //       console.log("Fetching data from API...");
    //       const baseUrl = process.env.VUE_APP_BASE_API_URL;
    //       let proxyUrl = "https://api.allorigins.win/raw?url=";
    //       let url =
    //         proxyUrl +
    //         encodeURIComponent(
    //           `${baseUrl}/website/website_api/settings?access_key=123456789`
    //         );

    //       const response = await fetch(url, {
    //         method: "GET",
    //         headers: {
    //           "Content-Type": "application/json",
    //           Accept: "application/json",
    //         },
    //       });

    //       if (!response.ok) {
    //         throw new Error(`HTTP error! Status: ${response.status}`);
    //       }

    //       const data = await response.json();
    //       this.widgets = data.widgets;
    //       localStorage.setItem("widgets", JSON.stringify(this.widgets));
    //      // this.extractMenuItems();
    //     }
 
    //       this.extractMenuItems();



    //   } catch (error) {
    //     console.error("Error fetching data:", error);
    //   }
    // },
    // extractMenuItems() {
    //   if (this.widgets && this.widgets.menu && this.widgets.menu.main_menu) {
    //     this.menuItems = this.widgets.menu.main_menu.map((item) => ({
    //       id: item.id,
    //       alias: item.alias,
    //       link:item.link,
    //       label: item.label,
    //       url: `${item.url}${item.link}`,
    //       children: item.children || [], // Include children for dropdown
    //     }));
    //   }
    // },
  },
  mounted() {
    //this.fetchData();
    const storedWidgets =localStorage.getItem("widgets");
    this.widgets = JSON.parse(storedWidgets);
    if (this.widgets && this.widgets.menu && this.widgets.menu.main_menu) {
        this.menuItems = this.widgets.menu.main_menu.map((item) => ({
          id: item.id,
          alias: item.alias,
          link:item.link,
          label: item.label,
          url: `${item.url}${item.link}`,
          children: item.children || [], // Include children for dropdown
        }));
      }
  },
};
</script>

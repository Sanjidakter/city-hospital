<template>
  <div v-if="!loading">
    <div class="logo_area py-4">
    <div class="container">
      <div class="row">
        <!-- Logo Column -->
        <div class="col-xl-5 col-md-3">
          <a href="/">
            <img
            :src="sidSite?.app_setting?.organization_information?.logo"
            class="img-fluid"
            alt="alt"
            
          />
          </a>
        </div>

        <!-- Contact Information Column -->
        <div
          class="col-xl-7 col-md-7 d-flex mobile_view"
        >
        
          <ul class="top_contact d-flex">
            <!-- Phone Number -->
            <li class="phone pe-3">
              <div class="has-icon d-flex align-items-center">
                <div class="icon me-2">
                  <i class="fa fa-phone"></i>
                </div>
                <div>
                  {{ sidSite?.app_setting?.organization_information?.mobile }}
                </div>
              </div>
            </li>
            <!-- Address -->
            <li class="address px-3 border-start border-end">
              <div class="has-icon d-flex align-items-center">
                <div class="icon me-2">
                  <i class="fa fa-map-marker-alt"></i>
                </div>
                <div>
                  {{ sidSite?.app_setting?.organization_information?.address }}
                </div>
              </div>
            </li>
            <!-- Email -->
            <li class="phone ps-3">
              <div class="has-icon d-flex align-items-center">
                <div class="icon me-2">
                  <i class="fas fa-envelope"></i>
                </div>
                <div>
                  {{
                    sidSite?.app_setting?.organization_information?.[
                      "contact-email"
                    ]
                  }}
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
  </div>
  <div v-else>loading ....</div>
</template>

<script>
export default {
  name: "LogoArea",
  data() {
    return {
      sidSite: [], 
      loading: true,
    };
  },
  async mounted() {
    // Call fetchData when the component is mounted
    await this.fetchData();
  },
  methods: {
    async fetchData() {
      let storedsidSite = localStorage.getItem("sid_site");
      const parsedsidSite = storedsidSite
        ? JSON.parse(storedsidSite)
        : null;

      // Use stored widgets if found, else fetch from API
      if (parsedsidSite) {
        // console.log("Using data from localStorage for sid_site...");
        this.sidSite = parsedsidSite;
        this.loading = false;
      } else {
        try {
          const baseUrl = this.$apiBaseUrl;
          const accessKey = this.$apiAccessKey;
          const url = `${baseUrl}/website/website_api/settings?access_key=${accessKey}`;

          const response = await fetch(url, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
            },
          });

          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }

          const data = await response.json();
          this.sidSite = data.sid_site;
          localStorage.setItem("sid_site", JSON.stringify(data.sid_site));
          this.loading = false;
        } catch (error) {
          console.error("Error fetching data:", error);
          this.loading = false;
        }
      }
    },
  },
};
</script>
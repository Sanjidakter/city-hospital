<template>
  <div class="logo_area py-4">
    <div class="container">
      <div class="row">
        <!-- Logo Column -->
        <div class="col-xl-3 col-md-3">
          <img
            :src="sidSite.app_setting?.organization_information?.logo"
            class="img-fluid"
            alt="alt"
          />
        </div>

        <!-- Contact Information Column -->
        <div
          class="col-xl-9 col-md-9 d-flex align-items-center justify-content-end"
        >
          <ul class="top_contact list-unstyled mb-0 d-flex">
            <!-- Phone Number -->
            <li class="phone pe-3">
              <div class="has-icon d-flex align-items-center">
                <div class="icon me-2">
                  <i class="fa fa-phone"></i>
                </div>
                <div>
                  {{ sidSite.app_setting?.organization_information?.mobile }}
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
                  {{ sidSite.app_setting?.organization_information?.address }}
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
                    sidSite.app_setting?.organization_information?.[
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
</template>

<script>
export default {
  name: "LogoArea",
  data() {
    return {
      sidSite: [], // Ensure widgets is defined in the data object
    };
  },
  async mounted() {
    // Call fetchData when the component is mounted
    await this.fetchData();
  },
  methods: {
    async fetchData() {
      try {
        const storedsidSite = localStorage.getItem("sid_site");

        // console.log("Fetching data from API for sidsite ...");
        const baseUrl = "http://cityhospital.techecosys.net";
        let proxyUrl = "https://api.allorigins.win/raw?url=";
        let url =
          proxyUrl +
          encodeURIComponent(
            `${baseUrl}/website/website_api/settings?access_key=123456789`
          );

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

        // Compare API data with localStorage data
        if (storedsidSite) {
          const parsedsidSite = JSON.parse(storedsidSite);

          // Compare stringified versions of the data to avoid deep object comparison
          if (JSON.stringify(parsedsidSite) !== JSON.stringify(data.sid_site)) {
            console.log("Data has changed in sideSite, updating localStorage...");
            localStorage.setItem("sid_site", JSON.stringify(data.sid_site)); // Use "sid_site" as key
            this.sidSite = data.sid_site;
          } else {
            console.log(
              "Data is the same as in localStorage, no update needed."
            );
            this.sidSite = parsedsidSite;
          }
        } else {
          // If no data in localStorage, set it
          console.log("No data in localStorage, setting new data...");
          localStorage.setItem("sid_site", JSON.stringify(data.sid_site)); // Use "sid_site" as key
          this.sidSite = data.sid_site;
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    },
  },
};
</script>

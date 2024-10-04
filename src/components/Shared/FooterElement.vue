<template>
  <footer class="">
    <footer id="footer" class="footer bg-light text-dark">
      <div class="container pt-5">
        <div class="row gy-4">
          <div class="col-lg-4 col-md-6 footer-about">
            <a href="index.html" class="logo d-flex align-items-center">
              <span class="sitename">{{
                sidSite.app_setting?.organization_information?.name
              }}</span>
            </a>
            <div class="footer-contact mb-1 pt-3">
              <p>1/8, Block-E, Lalmatia, Satmosjid</p>
              <p>Road, Mohammadpur, Dhaka - 1207.</p>
              <p class="mt-3">
                <strong>Phone:</strong>
                <span>{{
                  sidSite.app_setting?.organization_information?.["hot-number"]
                }}</span>
              </p>
              <p>
                <strong>Email:</strong>
                <span>{{
                  sidSite.app_setting?.organization_information?.[
                    "contact-email"
                  ]
                }}</span>
              </p>
            </div>
            <div class="social-links d-flex mt-4">
              <a href=""><i class="bi bi-twitter-x"></i></a>
              <a href=""><i class="bi bi-facebook"></i></a>
              <a href=""><i class="bi bi-instagram"></i></a>
              <a href=""><i class="bi bi-linkedin"></i></a>
            </div>
          </div>

          <div class="col-lg-2 col-md-3 footer-links">
            <h4>Useful Links</h4>
            <ul>
              <li><a href="/">Home</a></li>
              <li><a href="about-us">About us</a></li>
              <li><a href="services">Services</a></li>
              <li><a href="#">Terms of service</a></li>
              <li><a href="#">Privacy policy</a></li>
            </ul>
          </div>

          <div class="col-lg-2 col-md-3 footer-links">
            <h4>Our Services</h4>
            <ul>
              <li>
                <a href="http://cityhospital.techecosys.net/news_and_events"
                  >News &amp; Events</a
                >
              </li>
              <li>
                <a
                  href="http://cityhospital.techecosys.net/education-and-career"
                  >Education &amp; Career</a
                >
              </li>
              <li><a href="http://cityhospital.techecosys.net/faq">FAQ</a></li>
              <li>
                <a href="http://cityhospital.techecosys.net/location"
                  >Location</a
                >
              </li>
            </ul>
          </div>

          <div class="col-lg-4 col-md-6 footer-links">
            <h4>Doctors</h4>
            <ul>
              <li><a href="#">Prof. Dr. Shahidul Bari</a></li>
              <li><a href="#"> Prof. Dr. Nasima Begum</a></li>
              <li><a href="#">Prof. (Dr.) Paritosh Kumar Baral</a></li>
              <li><a href="#">Prof. Dr. Md. Faizul Islam Chowdhury</a></li>
              <li><a href="#"> Prof. Dr. Mahmood Hasan</a></li>
              <li><a href="#"> Prof. Dr. Md. Ehteshamul Hoque</a></li>
            </ul>
          </div>
        </div>
      </div>

      <div class="container copyright text-center mt-4">
        <p>
          © <span>Copyright</span>
          <strong class="px-1 sitename">City Hospital Limited</strong>
          <span>All Rights Reserved</span>
        </p>
        <div class="credits">
          Designed by
          <a href="https://autofysolutions.com/">Autofy Solutions</a>
        </div>
      </div>
    </footer>
  </footer>
</template>

<script>
export default {
  name: "FooterElement",
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
        if (!storedsidSite) {
          console.log(
            "there is no stored sidSite present in localStorage to show in footer"
          );
        }
        const parsedsidSite = JSON.parse(storedsidSite);
        this.sidSite = parsedsidSite;
      } catch (error) {
        console.error("Error fetching sidSite data for footer:", error);
      }
    },
  },
};
</script>

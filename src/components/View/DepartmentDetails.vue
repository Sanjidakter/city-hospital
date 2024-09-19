<template>
  <div  v-if="department">
    <div class="page_title">
      <div class="container">
        <div class="row">
          <div class="col-md-12 pt-2">
            <h3 class="font-weight-bold">{{ department.title }}</h3>
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
                {{ department.alias }}
                <span class="divider-last">&nbsp;</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <div class="card container p-4">
      <img
        v-if="department.image_url"
        :src="department.image_url"
        class="card-img-top"
        alt="Featured Image"
      />
      <div class="card-body text-center">
        <h1>{{ department.id }}</h1>
        <h5 class="card-title">{{ department.title }}</h5>
        <h6 class="card-subtitle mb-2 text-muted">
          {{ department.sub_title || "No subtitle available" }}
        </h6>
        <p class="card-text" v-html="department.fulltext"></p>
        <p class="card-text">
          <strong>Category:</strong> {{ department.category_title }} <br />
          <strong>Total Views:</strong> {{ department.total_view }} <br />
          <strong>Updated:</strong> {{ department.updated }} <br />
          <strong>Publish Date:</strong> {{ department.publish_date }} <br />
          <strong>Status:</strong> {{ department.status }}
        </p>
      </div>
    </div>

    <!-- Display doctors section -->
    <div class="doctors-section container mt-5" v-if="doctors && doctors.length">
      <h3 class="m-4">Doctors in this Department</h3>
      <div class="container">
        <div class="row gy-4">
          <div
            class="col-lg-3 col-md-3"
            v-for="doctor in doctors"
            :key="doctor.id"
          >
            <div class="team">
              <div class="text-center">
                <img
                  class="img-fluid"
                  src="http://cityhospital.techecosys.net//includes/themes/primary/hospital/hospital/assets/img/doctors.png"
                  alt=""
                />
                <div class="pt-1">
                  <strong>{{ doctor.name }}</strong>
                  <p>{{ doctor.degree }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "DepartmentDetails",
  props: {
    id: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      department: null,
      doctors: [], // Initialize as an empty array
    };
  },

  watch: {
    "$route.params.alias": {
      immediate: true, // Watch and load content immediately
    },
  },
  methods: {
    async fetchDepartmentDetail() {
      try {
        const baseUrl = "http://cityhospital.techecosys.net";
        let proxyUrl = "https://api.allorigins.win/get?url=";
        let url =
          proxyUrl +
          encodeURIComponent(
            `${baseUrl}/website/website_api/contents/department?access_key=123456789`
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

        const result = await response.json();
        const data = JSON.parse(result.contents);

        // Find the department by ID
        this.department = data.contents.find(
          (department) => department.id == this.id
        );
        // Once the department details are fetched, call fetchDepartmentDoctors
        if (this.department && this.department.id) {
          this.fetchDepartmentDoctors(this.department.id);
        }
      } catch (error) {
        console.error("Error fetching department details:", error);
      }
    },
    async fetchDepartmentDoctors(departmentId) {
      try {
        const baseUrl = "http://cityhospital.techecosys.net";
        let proxyUrl = "https://api.allorigins.win/get?url=";
        let url =
          proxyUrl +
          encodeURIComponent(
            `${baseUrl}/pip/pip_api/doctors?website_content_id=${departmentId}&access_key=123456789`
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

        const result = await response.json();

        // Assuming the 'doctors' data is in the result, check the structure
        const data = result.contents
          ? JSON.parse(result.contents).doctors
          : result.doctors;

        // Assign doctors data to the doctors array
        this.doctors = data;
        // console.log("Doctors Data:", data);
      } catch (error) {
        console.error("Error fetching doctors details:", error);
      }
    },
  },
  mounted() {
    this.fetchDepartmentDetail();
    this.fetchDepartmentDoctors();
  },
};
</script>

<style scoped>
.container {
  max-width: 800px;
  margin: auto;
}
.card-img-top {
  max-height: 400px;
  object-fit: cover;
}
</style>

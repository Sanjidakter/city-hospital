<template>
  <div class="container my-5" v-if="department">
    <div class="card">
      <img
        v-if="department.image_url"
        :src="department.image_url"
        class="card-img-top"
        alt="Featured Image"
      />
      <div class="card-body">
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
    <div class="doctors-section mt-5" v-if="doctors && doctors.length">
      <h3>Doctors in this Department</h3>
      <div class="doctor-card" v-for="doctor in doctors" :key="doctor.id">
        <div class="card mb-3">
          <div class="row no-gutters">
            <div class="col-md-4">
              <img
                v-if="doctor.image_url"
                :src="doctor.image_url"
                class="card-img"
                alt="Doctor Image"
              />
            </div>
            <div class="col-md-8">
              <div class="card-body">
                <h5 class="card-title">{{ doctor.name }}</h5>
                <p class="card-text">{{ doctor.speciality }}</p>
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
        console.log("Doctors Data:", data);
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

<template>
  <div v-if="department">
    <PageTitle :title="department.title" :alias="department.alias" />
    <div class="container py-4">
      <div class="row">
        <div class="col-md-4 col-sm-12">
          <div class="image">
            <img
              v-if="department.image_url"
              :src="department.image_url"
              class="img-fluid"
              alt="Featured Image"
            />
          </div>
        </div>
        <div class="col-md-8 col-sm-12">
          <div class="details">
            <h6>{{ department.sub_title }}</h6>
            <p class="card-text" v-html="department.fulltext"></p>
          </div>
        </div>
      </div>
    </div>

    <!-- Display doctors section -->
    <div
      class="doctors-section container mt-5"
      v-if="doctors && doctors.length"
    >
      <h3 class="m-4">Doctors in this Department</h3>
      <div class="container">
        <div class="row gy-4">
          <div
            class="col-lg-3 col-md-3"
            v-for="doctor in doctors"
            :key="doctor.id"
            @click="redirectToDoctorDetails(doctor.id)"
          >
            <div class="team_member">
              <div class="team_img">
                <img
                  class="img-fluid"
                  src="http://cityhospital.techecosys.net//includes/themes/primary/hospital/hospital/assets/img/doctors.png"
                  alt=""
                />
              </div>
              <div class="team_details text-center">
                <div class="team_name py-2">
                  <strong>{{ doctor.name }}</strong>
                </div>
                <div class="details">
                  <p>{{ doctor.degree }}</p>
                </div>
                <div class="text-center button_profile py-3">
                  <a href="#"> view Profile</a>
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
import PageTitle from "./PageTitle.vue";

export default {
  name: "DepartmentDetails",
  components: {
    PageTitle,
  },
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
        let url =
          this.$apiBaseUrl +
          `website/website_api/contents/department?access_key=` +
          this.$apiAccessKey;

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
        const data = result.contents;

        // Find the department by alias
        this.department = data?.find(
          (department) => department.alias == this.$route.params.alias
        );

        // Fetch doctors if the department is found
        if (this.department && this.department.id) {
          this.fetchDepartmentDoctors(this.department.id);
        }
      } catch (error) {
        console.error("Error fetching department details:", error);
      }
    },
    async fetchDepartmentDoctors(departmentId) {
      try {
        let url =
          this.$apiBaseUrl +
          `pip/pip_api/doctors?website_content_id=${departmentId}&access_key=${this.$apiAccessKey}`;

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

    redirectToDoctorDetails(doctorId) {
      this.$router.push({ name: "DoctorDetails", params: { id: doctorId } });
    },
  },
  mounted() {
    this.fetchDepartmentDetail();
    this.fetchDepartmentDoctors();
  },
};
</script>
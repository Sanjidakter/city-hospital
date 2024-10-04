<template>
  <div class="page_title">
    <div class="container">
      <div class="row">
        <div class="col-md-12 pt-2">
          <h3 class="font-weight-bold">
            <a href="/doctors" class="text-decoration-none">Doctors</a>
          </h3>

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
              Doctors
              <span class="divider-last">&nbsp;</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
  <div class="doctor-details mt-4">
    <div class="container d-flex">
      <div>
        <img
          :src="doctor.image_url || defaultImage"
          alt="Doctor Image"
          class="img-fluid"
        />
      </div>
      <div class="m-auto">
        <h3 class="title">
          <a href="">{{ doctor.name }}</a>
        </h3>
        <p title="Degree">{{ doctor.speciality }}</p>
        <p><strong>Degree:</strong> {{ doctor.degree }}</p>

        <p><strong>available_day</strong> {{ doctor.available_day }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "DoctorDetails",
  data() {
    return {
      doctor: {},
      defaultImage:
        "http://cityhospital.techecosys.net//includes/themes/primary/hospital/hospital/assets/img/doctors.png",
    };
  },
  methods: {
    async fetchDoctorDetails() {
      const doctorId = this.$route.params.id;
      let url = `${this.$apiBaseUrl}/pip/pip_api/doctors/${doctorId}?access_key=${this.$apiAccessKey}`;

      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const result = await response.json();
        this.doctor = result.doctor || {};
        console.log("Doctor details:", this.doctor);
      } catch (error) {
        console.error("Error fetching doctor details:", error);
      }
    },
    goBack() {
      this.$router.go(-1); // Go back to the previous page
    },
  },
  mounted() {
    this.fetchDoctorDetails();
  },
};
</script>

<style scoped>
.doctor-details {
  /* display: flex; */
  justify-content: center; /* Center horizontally */
  align-items: center; /* Center vertically */
  height: 100vh; /* Full height to allow vertical centering */
}
</style>

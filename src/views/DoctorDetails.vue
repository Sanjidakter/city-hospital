<template>
  <div class="page_title">
    <div class="container">
      <div class="row">
        <div class="col-md-12 pt-2">
          <h3 class="font-weight-bold">
            <a href="/" class="text-decoration-none">{{ doctor.name }}</a>
          </h3>

          <ul class="breadcrumb">
            <li class="breadcrumb-item">
              <a href="/">Home </a>
              <span class="divider">&nbsp;</span>
            </li>
            <li class="breadcrumb-item">
              <a href="/">Pages</a>
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
  <div class="doctor-details">
    <div class="bg-light">
      <div class="container py-4">
        <div class="row">
          <div class="col-md-3 col-sm-12">
            <div class="profile shadow-lg">
              <img
                :src="doctor.image_url || defaultImage"
                alt="Doctor Image"
                class="img-fluid"
              />
            </div>
          </div>
          <div class="col-md-9 col-sm-12">
            <div class="profile_name p-2">
              <h4 class="font-weight-bold">
                <strong>{{ doctor.name }}</strong>
              </h4>

              <h4 class="font-weight-bold text-black">
                Information
                <hr />
              </h4>
              <h4>Degree:</h4>
              <p title="Degree">
                {{ doctor.degree }}
              </p>
              <h4>Speciality</h4>
              <p>{{ doctor.speciality }}</p>

              <h3>Visit Time and Fee</h3>
              <hr />

              <p>Visit Time</p>
              <p>{{ doctor.available_day }}</p>
            </div>
          </div>
        </div>
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
      let url = `${this.$apiBaseUrl}pip/pip_api/doctors/${doctorId}?access_key=${this.$apiAccessKey}`;

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
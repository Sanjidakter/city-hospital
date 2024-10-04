<template>
  <div class="page_title">
      <div class="container">
        <div class="row" >
          <div class="col-md-12 pt-2">
            <h3 class="font-weight-bold">
  <a href="doctors" class="text-decoration-none">Doctors</a>
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
  <div class="doctors_list mt-2">
    <div class="container">
      <h2 class="about_title">Find Your Doctor</h2>
      <p><strong>Choose a department or type doctors name.</strong></p>
      <div class="row gy-2">
        <div class="col-lg-5 col-md-10">
          <select
            class="form-select"
            v-model="selectedDepartment"
            aria-label="Default select example"
          >
            <option value="" disabled selected>Select A Department</option>
            <option
              v-for="department in departments"
              :key="department.id"
              :value="department.id"
            >
              {{ department.title }}
            </option>
          </select>
        </div>
        <div class="col-lg-5 col-md-10">
          <input
            type="text"
            class="form-control"
            v-model="doctorName"
            placeholder="Doctors Name"
          />
        </div>
        <div class="col-lg-2 col-md-2">
          <button @click="searchDoctor" class="btn btn-primary mb-3">
            Search
          </button>
        </div>
      </div>
    </div>
  </div>
  <div class="board_of_directors">
    <div class="container">
      <div class="row gy-4">
        
        <div v-if="doctors.length === 0" class="col-md-12 text-center">
        
          <h3>No matching doctors found!</h3>
        </div>
         <!-- Loop through doctors and display them -->
        <div
          class="col-lg-3 col-md-3"
          v-for="doctor in doctors"
          :key="doctor.id"
          @click="redirectToDoctorDetails(doctor.id)"
          style="cursor: pointer;"
        >
          <div class="team">
            <div class="text-center">
              <img
                class="img-fluid"
                :src="doctor.image_url || defaultImage"
                alt="doctor"
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
</template>

<script>
  export default {
  name: "DoctorsList",
  data() {
    return {
      doctors: [],
      departments: [],
      doctorName: "", // for holding the input name
      selectedDepartment: "", // for holding the selected department
      defaultImage:
        "http://cityhospital.techecosys.net//includes/themes/primary/hospital/hospital/assets/img/doctors.png", // fallback image
    };
  },
  
  methods: {
    async fetchDepartmentDoctors() {
      try {
        let url =
        this.$apiBaseUrl +`/pip/pip_api/doctors?access_key=`+this.$apiAccessKey;
          
        const response = await fetch(url, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error not getting data from doctors api! Status: ${response.status}`);
        }

        const result = await response.json();
        const data = result.doctors || [];
        // Ensure the data is an array
        this.doctors = Array.isArray(data) ? data : [];
        console.log("Doctors list Data:", this.doctors);
      } catch (error) {
        console.error("Error fetching doctors list:", error);
      }
    },

    loadFromLocalStorage() {
      const storedData = localStorage.getItem("doctorsList");
      if (storedData) {
        this.doctors = JSON.parse(storedData);
      } else {
        this.fetchDepartmentDoctors();
      }
    },

    async searchDoctor() {
      try {
        let query = this.$apiBaseUrl + `/pip/pip_api/doctors?access_key=` + this.$apiAccessKey;
        if (this.doctorName) query += `&keyword=${this.doctorName}`;
        if (this.selectedDepartment) query += `&website_content_id=${this.selectedDepartment}`;

        let url = query;

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
        const data = result?.doctors || [];
        // Ensure the data is an array
        this.doctors = Array.isArray(data) ? data : [];
        console.log("Searched Doctors list:", this.doctors);
      } catch (error) {
        console.error("Error searching for doctors:", error);
      }
    },

    async fetchDepartmentInfo() {
      try {
        let url =
        this.$apiBaseUrl + `/website/website_api/contents/department?access_key=` + this.$apiAccessKey;

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
        const data = result?.contents;
        this.departments = data;
        console.log("Departments:", this.departments);
      } catch (error) {
        console.error("Error fetching department data:", error);
      }
    },

    redirectToDoctorDetails(doctorId) {
      this.$router.push({ name: 'DoctorDetails', params: { id: doctorId } });
    }
  },

  mounted() {
    this.loadFromLocalStorage();
    this.fetchDepartmentInfo();
  },
};

 
</script>

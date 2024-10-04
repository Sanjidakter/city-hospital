<template>
  <div class="doctors_list">
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
        <div
          class="col-lg-3 col-md-3"
          v-for="doctor in doctors"
          :key="doctor.id"
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
        const baseUrl = "http://cityhospital.techecosys.net";
        let proxyUrl = "https://api.allorigins.win/get?url=";
        let url =
          proxyUrl +
          encodeURIComponent(
            `${baseUrl}/pip/pip_api/doctors?access_key=123456789`
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
        const data = JSON.parse(result.contents || "[]");

        // store fetched data in localstorage
        localStorage.setItem("doctorsList", JSON.stringify(data.doctors));

        // Assign doctors data to the doctors array
        this.doctors = data.doctors;
        console.log("Doctors list Data:", data.doctors);
      } catch (error) {
        console.error("Error fetching doctors list:", error);
      }
    },

    loadFromLocalStorage() {
      const storedData = localStorage.getItem("doctorsList");
      if (storedData) {
        this.doctors = JSON.parse(storedData);
        console.log("Loaded doctors from localStorage:", this.doctors);
      } else {
        // Fetch the data if not available in localStorage
        this.fetchDepartmentDoctors();
      }
    },

    async searchDoctor() {
      try {
        const baseUrl = "http://cityhospital.techecosys.net";
        let proxyUrl = "https://api.allorigins.win/get?url=";

        // Build query parameters based on the search inputs
        let query = `${baseUrl}/pip/pip_api/doctors?access_key=123456789`;
        if (this.doctorName) query += `&keyword=${this.doctorName}`;
        if (this.selectedDepartment)
          query += `&website_content_id=${this.selectedDepartment}`;

        let url = proxyUrl + encodeURIComponent(query);

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
        const data = JSON.parse(result.contents || "[]");

        // Update doctors array with search results
        this.doctors = data.doctors || [];
        console.log("Searched Doctors list:", this.doctors);
      } catch (error) {
        console.error("Error searching for doctors:", error);
      }
    },

    async fetchDepartmentInfo() {
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

        // Parse the response as JSON
        const result = await response.json();
        const data = JSON.parse(result.contents);

        // Update component data
        this.departments = data.contents;
        console.log("departments", this.departments);
      } catch (error) {
        console.error("Error fetching department data:", error);
      }
    },
  },
  mounted() {
    this.loadFromLocalStorage();
    this.fetchDepartmentInfo();
   

  },
};
</script>

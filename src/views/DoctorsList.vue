<template>
  <PageTitle title="Doctor" type="Doctor" />
  <div class="doctors_list mt-2">
    <div class="container">
      <h2 class="about_title">Find Your Doctor</h2>

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
            placeholder="Type Doctor Name"
          />
        </div>
        <div class="col-lg-2 col-md-2">
          <button @click="searchDoctor" class="btn btn-primary mb-3">
            Search
          </button>
        </div>
      </div>

      <!-- Department by alphabet -->
      <div
        class="text-center m-5 section-padding-bottom justify-center pagination-buttons"
        id="speciality-search"
        style="grid-column: span 12 / span 12; margin: 0px auto"
      >
        <div class="speciality-search-text">
          <p>Search by Department</p>
        </div>
        <div>
          <button
            v-for="letter in letters"
            :key="letter"
            class="alpha-btn n-button n-button--default-type n-button--tiny-type pagination-button"
            tabindex="0"
            type="button"
            @click="filterDoctorsByLetter(letter)"
            style="height: 25px; width: 25px; padding: 0px; line-height: 1"
          >
            <span class="n-button__content">{{ letter }}</span>
            <div aria-hidden="true" class="n-base-wave"></div>
            <div aria-hidden="true" class="n-button__border"></div>
            <div aria-hidden="true" class="n-button__state-border"></div>
          </button>
        </div>
      </div>
      <!-- departby aplhabet -->
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
          style="cursor: pointer"
        >
       
          <div class="team_member">
            <div class="team_img">
              <img
                class="img-fluid doctor-image"
                :src="doctor.profile_photo? `${apiBaseUrl}${doctor.profile_photo}` : defaultImage"
                
                alt="doctor"
              />
            </div>
            <div class="team_details text-center">
              <div class="team_name py-2">
                <strong>{{ doctor.name }}</strong>
              </div>
              <div class="details">
                <p>{{ truncateText(doctor.degree, 5) }}</p>
              </div>
              <div class="text-center button_profile py-3" style="color: green">
                <a @click.prevent="redirectToDoctorDetails(doctor.id)"
                  >view Profile</a
                >
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
  name: "DoctorsList",
  components: {
    PageTitle,
  },
  data() {
    return {
      doctors: [],
      filteredDoctors: [],
      letters: [
        "All",
        "A",
        "B",
        "C",
        "D",
        "E",
        "F",
        "G",
        "H",
        "I",
        "J",
        "K",
        "L",
        "M",
        "N",
        "O",
        "P",
        "Q",
        "R",
        "S",
        "T",
        "U",
        "V",
        "W",
        "X",
        "Y",
        "Z",
      ],
      departments: [],
      doctorName: "",
      selectedDepartment: "",
      selectedLetter: "All",
      defaultImage:
        "http://cityhospital.techecosys.net//includes/themes/primary/hospital/hospital/assets/img/doctors.png",
    };
  },

  methods: {
    async fetchDepartmentDoctors() {
      try {
        let url =
          this.$apiBaseUrl +
          `pip/pip_api/doctors?access_key=` +
          this.$apiAccessKey;

        const response = await fetch(url, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        });

        if (!response.ok) {
          throw new Error(
            `HTTP error not getting data from doctors api! Status: ${response.status}`
          );
        }

        const result = await response.json();
        const data = result.doctors || [];
        // Ensure the data is an array
        this.doctors = Array.isArray(data) ? data : [];
        // console.log("Doctors list Data:", this.doctors);
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
        let query =
          this.$apiBaseUrl +
          `pip/pip_api/doctors?access_key=` +
          this.$apiAccessKey;
        if (this.doctorName) query += `&keyword=${this.doctorName}`;
        if (this.selectedDepartment)
          query += `&website_content_id=${this.selectedDepartment}`;

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
        // console.log("Searched Doctors list:", this.doctors);
      } catch (error) {
        console.error("Error searching for doctors:", error);
      }
    },

    async fetchDepartmentInfo() {
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
        const data = result?.contents;
        this.departments = data;
        // console.log("Departments:", this.departments);
      } catch (error) {
        console.error("Error fetching department data:", error);
      }
    },
    // New method to filter departments by the first letter
    filterDoctorsByLetter(letter) {
      this.selectedLetter = letter; // Update the selected letter

      // If the letter is 'All', show all doctors
      if (letter === "All") {
        this.fetchDepartmentDoctors(); // Fetch all doctors
      } else {
        // Find the department that starts with the selected letter
        const selectedDepartment = this.departments.find((dept) =>
          dept.title.startsWith(letter)
        );

        if (selectedDepartment) {
          // Construct the API query with the selected department's website_content_id
          let query =
            this.$apiBaseUrl +
            `pip/pip_api/doctors?access_key=` +
            this.$apiAccessKey +
            `&website_content_id=${selectedDepartment.id}`;

          // Add the doctor's name filter if it is provided
          if (this.doctorName) {
            query += `&keyword=${this.doctorName}`;
          }

          // Fetch the filtered data from the API
          fetch(query, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
            },
          })
            .then((response) => {
              if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
              }
              return response.json();
            })
            .then((result) => {
              const data = result?.doctors || [];
              // Ensure the data is an array and update the doctors list
              this.doctors = Array.isArray(data) ? data : [];
              this.filteredDoctors = this.doctors;
            })
            .catch((error) => {
              console.error("Error fetching doctors by department:", error);
            });
        } else {
          // If no department matches the letter, clear the doctors list
          this.doctors = [];
          this.filteredDoctors = [];
        }
      }
    },

    redirectToDoctorDetails(doctorId) {
      this.$router.push({ name: "DoctorDetails", params: { id: doctorId } });
    },
    truncateText(text, wordLimit) {
      if (!text) return "";
      const words = text.split(" ");
      return words.length > wordLimit
        ? words.slice(0, wordLimit).join(" ") + "..."
        : text;
    },
  },

  mounted() {
    this.loadFromLocalStorage();
    this.fetchDepartmentInfo();
  },
};
</script>

<style>
.team_member {
  position: relative;
  overflow: hidden;
  border: 1px solid #ddd;
  transition: transform 0.3s ease-in-out;
}

.team_member:hover {
  transform: translateY(-10px);
}

.team_img {
  position: relative;
  overflow: hidden;
  width: 270px;
  height: 468px;
}

.doctor-image {
  transition: transform 0.3s ease-in-out, filter 0.3s ease-in-out;
}

.team_member:hover .doctor-image {
  transform: scale(1.1); /* Zoom effect on hover */
  filter: grayscale(100%); /* Change image to grayscale */
}

/* Default state for team_details - fixed at the bottom */
.team_details {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: #00a550; /* Default background */
  color: white; /* Default text color */
  padding: 15px;
  transition: background 0.3s ease-in-out, color 0.3s ease-in-out;
  z-index: 2; /* Ensure it's on top of the image */
}

/* On hover, team_details goes over the image */
.team_member:hover .team_details {
  background: rgba(0, 165, 80, 0.7); /* Green background with opacity */
  color: white; /* White text on hover */
  height: 100%; /* Cover the entire card height */
  display: flex;
  flex-direction: column;
  justify-content: center;
  opacity: 1;
}

.team_member:hover .button_profile a {
  background: #ec8a1b;
  color: white;
  text-decoration: none;
}

/* Ensure text visibility when hovered */
.team_member:hover .team_name,
.team_member:hover .details,
.team_member:hover {
  color: white;
}

/* ********* ****/
.speciality-search-text {
  color: #282828;
  font-family: IBM Plex Sans, Arial;
  font-weight: 700;
  margin-bottom: 0.5rem;
  text-align: center;
}
.speciality-search-text p {
  font-size: 15px !important;
}
.pagination-buttons .pagination-button:not(:last-child) {
  margin-right: 10px !important;
}

.pagination-buttons .pagination-button {
  font-size: 14px;
  line-height: 1 !important;
}
.alpha-btn {
  background-color: #00a550;
  color: white;
  transition: background-color 0.3s ease, color 0.3s ease;
}

.alpha-btn:hover {
  background-color: white;
  color: #00a550;
}
</style>

<!--  :src="`${apiBaseUrl}${doctor.profile_photo}`" -->
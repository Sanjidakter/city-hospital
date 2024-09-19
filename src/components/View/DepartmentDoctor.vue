<template>
  <section class="all-departments py-5">
    <div class="container">
      <h2 class="text-center text-orange mb-4">All Departments</h2>

      <div class="row">
        
        <div
          class="col-md-4 mb-4"
          v-for="department in departmentContent"
          :key="department.id"
        >
          <div class="department-details p-3 border rounded">
            <div class="team_img p-2">
              <i class="fas fa-stethoscope"></i>
            </div>
            <h5 class="text-center">{{ department.title }}</h5>
            <div>
              <!-- Display only truncated text -->
              <div
                class="p-3"
                v-html="getTruncatedText(department.fulltext)"
              ></div>

              <!-- Show More button redirects to Department Details page -->
              <div class="d-flex justify-content-between">
                <button
                  class="btn btn-primary"
                  @click="goToDepartmentPage(department.id)"
                >
                  More
                </button>
                <a href="/doctors" class="btn btn-success">Doctors</a>

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "DepartmentDoctor",
  data() {
    return {
      departmentContent: [],
    };
  },
  methods: {
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
        this.departmentContent = data.contents;
        console.log("deparment content", this.departmentContent);
      } catch (error) {
        console.error("Error fetching department data:", error);
      }
    },
    getTruncatedText(text) {
      // Limit to 16 words
      let words = text.split(/\s+/);
      if (words.length <= 16) return text;
      return words.slice(0, 16).join(" ") + "...";
    },
    goToDepartmentPage(departmentId) {
      // Navigate to the department details page and pass department data
      this.$router.push({
        name: "DepartmentDetails",
        params: { id: departmentId },
      });
    },
  },
  mounted() {
    this.fetchDepartmentInfo();
  },
};
</script>

<style scoped>
.text-orange {
  color: #f19a2e;
}

.department-details {
  background-color: #f9f9f9;
  transition: all 0.3s ease;
}

.department-details:hover {
  background-color: #f1f1f1;
  transform: translateY(-5px);
}
</style>

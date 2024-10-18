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
            <div class="p-2">
              <i style="font-size: 45px; text-align: center;" class="fas fa-stethoscope"></i>
            </div>
            <h5 class="text-center">{{ department.title }}</h5>
            <div>
              <!-- Display only truncated text -->
              <div class="p-3" v-html="getTruncatedText(department.fulltext)"></div>

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
       
        let url =
        this.$apiBaseUrl +`/website/website_api/contents/department?access_key=`+this.$apiAccessKey
         

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
        const data = result.contents;

        // Store fetched data in localStorage
        localStorage.setItem("departmentContent", JSON.stringify(data));

        // Update component data
        this.departmentContent = data
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
    loadFromLocalStorage() {
      const storedData = localStorage.getItem("departmentContent");
      if (storedData) {
        this.departmentContent = JSON.parse(storedData);
      } else {
        // Fetch the data if not available in localStorage
        this.fetchDepartmentInfo();
      }
    },
  },
  mounted() {
    // Load data from localStorage or fetch from the server
    this.loadFromLocalStorage();
  },
};
</script>



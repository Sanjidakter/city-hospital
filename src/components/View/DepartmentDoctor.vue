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
            <i class="fas fa-stethoscope"></i>
            <h5 class="text-center">{{ department.title }}</h5>
            <!-- <p>{{ department.fulltext }}</p> -->
            <div class="p-3" v-html="department.fulltext"></div>
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

      // Log each department's name
      data.contents.forEach(department => {
        console.log(department.title);
      });

      // Update component data
      this.departmentContent = data.contents;
    } catch (error) {
      console.error("Error fetching data:", error);
    }
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

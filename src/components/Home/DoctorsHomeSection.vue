<template>
  <section id="doctors" class="doctors section light-background">
    <!-- Section Title -->
    <div class="container section-title aos-init" data-aos="fade-up">
      <h2>Departments Doctors</h2>
      <p>
        Necessitatibus eius consequatur ex aliquid fuga eum quidem sint
        consectetur velit
      </p>
    </div>
    <!-- End Section Title -->
    <div class="container">
      <div class="row gy-4">
        <div
          v-for="(department, index) in departments"
          :key="index"
          class="col-lg-2 col-md-6 aos-init"
          data-aos="fade-up"
          :data-aos-delay="100 * (index + 1)"
        >
          <a href="#">
            <div class="dept-card text-center py-4">
              <div class="stat-img p-2">
                <i class="fas fa-stethoscope"></i>
              </div>
              <div class="text-center">
                <h3 style="font-size: 16px; font-weight: bold; color: #00a550">
                  {{ department.name }}
                </h3>
              </div>
            </div>
          </a>
        </div>
        <div
          class="col-lg-2 col-md-6 aos-init aos-animate"
          data-aos="fade-up"
          data-aos-delay="100"
        >
          <div class="pt-5">
            <div class="text-center pt-4">
              <a class="all-btn" @click="gotoAllDepartments" 
                >Departments</a
              >
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "DoctorsHomeSection",
  props: {
    departments: {
      type: Array,
      default: () => [],
    },
  },
  methods: {
    gotoAllDepartments() {
      this.$router.push({
        path: "/departments",
      });
    },
  },
};
</script>
<style>
.dept-card {
  background-color: var(--surface-color);
  overflow: hidden;
  border-radius: 5px;
  height: 100%;
}
.stat-img {
  font-size: 45px;
  position: relative;
  color: #ed8a1c;
}
.dept-btn {
  padding: 10px;
  background: #07a55f;
  color: white;
}
.dept-btn:hover {
  padding: 10px;
  background: white;
  color: #07a55f;
  border: #07a55f solid;
}
</style>
<template>
  <section id="stats" class="stats section">
    <div
      class="container aos-init aos-animate"
      data-aos="fade-up"
      data-aos-delay="100"
    >
      <div class="row gy-4">
        <div class="col-lg-3 col-md-6">
          <div class="stats-item d-flex align-items-center w-100 h-100">
            <i class="fas fa-user-md flex-shrink-0"></i>
            <div>
              <span
                data-purecounter-start="0"
                data-purecounter-end="100"
                data-purecounter-duration="0"
                class="purecounter"
                >100</span
              >
              <p>Doctors</p>
            </div>
          </div>
        </div>
        <!-- End Stats Item -->

        <div class="col-lg-3 col-md-6">
          <div class="stats-item d-flex align-items-center w-100 h-100">
            <i class="far fa-hospital flex-shrink-0"></i>
            <div>
              <span
                data-purecounter-start="0"
                data-purecounter-end="54"
                data-purecounter-duration="0"
                class="purecounter"
                >54</span
              >
              <p>Departments</p>
            </div>
          </div>
        </div>
        <!-- End Stats Item -->

        <div class="col-lg-3 col-md-6">
          <div class="stats-item d-flex align-items-center w-100 h-100">
            <i class="fas fa-user-nurse flex-shrink-0"></i>
            <div>
              <span
                data-purecounter-start="0"
                data-purecounter-end="300"
                data-purecounter-duration="0"
                class="purecounter"
                >300</span
              >
              <p>Trained Nurse</p>
            </div>
          </div>
        </div>
        <!-- End Stats Item -->

        <div class="col-lg-3 col-md-6">
          <div class="stats-item d-flex align-items-center w-100 h-100">
            <i class="fas fa-procedures flex-shrink-0"></i>
            <div>
              <span
                data-purecounter-start="0"
                data-purecounter-end="10000"
                data-purecounter-duration="0"
                class="purecounter"
                >10000</span
              >
              <p>happy patient</p>
            </div>
          </div>
        </div>
        <!-- End Stats Item -->
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "StatsSection",
};
</script>

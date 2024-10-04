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
            <div class="team_mamber text-center py-4">
              <div class="team_img p-2">
                <i class="fas fa-stethoscope"></i>
              </div>
              <div class="text-center">
                <h3>{{ department.name }}</h3>
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
              <a href="/departments" class="btn">All Departments</a>
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
    departments:{
      type:Array,
      default:()=>[],
    }
  },
  
};
</script>

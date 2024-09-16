<template>
  <section id="stats" class="stats section">
    <div class="container aos-init" data-aos="fade-up" data-aos-delay="100">
      <span v-html="description"></span>
    </div>
  </section>
</template>

<script>
import AOS from "aos";
import { default as PureCounter } from "@srexi/purecounterjs"; // Use 'default' for importing

export default {
  name: "StatsHomeSection",
  props: {
    description: {
      type: String,
      required: false, // Allow this prop to be optional
    },
  },
  mounted() {
    // Initialize AOS
    AOS.init({
      duration: 1000, // Animation duration
      once: true, // Whether animation should happen only once
    });
    // Initialize PureCounter correctly
    new PureCounter(); // PureCounter is not a constructor, it's initialized like this
  },
};
</script>

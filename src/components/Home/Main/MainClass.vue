<template>
 <div class="main">
  <FeaturedServices />
  <AboutSection/>
  <ServicesSection/>
  <CallToAction/>
  <StatsSection/>
 </div>
</template>

<script>
import AboutSection from "./AboutSection.vue";
import CallToAction from "./CallToAction.vue";
import FeaturedServices from "./FeaturedServices.vue";
import ServicesSection from "./ServicesSection.vue";
import StatsSection from "./StatsSection.vue";

export default {
  name: "MainClass",
  components: {
    FeaturedServices,
    AboutSection,
    ServicesSection,
    StatsSection,
    CallToAction,
    
  },
};
</script>

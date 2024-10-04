<template>
     <div class="page_title">
      <div class="container">
        <div class="row">
          <div class="col-md-12 pt-2">
            <h3 class="font-weight-bold">All Services</h3>
            <ul class="breadcrumb">
              <li class="breadcrumb-item">
                <a href="http://cityhospital.techecosys.net/">Home </a>
                <span class="divider">&nbsp;</span>
              </li>
              <li class="breadcrumb-item">
                <a href="http://cityhospital.techecosys.net/pages">Pages</a>
                <span class="divider">&nbsp;</span>
              </li>
              <li class="breadcrumb-item">
                All Services
                <span class="divider-last">&nbsp;</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <div class="services-page container text-center">
      <h1>All Services</h1>
      <div class="container" v-if="services.length">
        <div class="service-block mb-5 mb-lg-0" v-for="(service, index) in services" :key="index">
          <h3>{{ service.title }}</h3>
          <p>{{ service.fulltext }}</p>
          <img :src="service.image_url" alt="Service Image" />
        </div>
      </div>
      <div v-else>
        <p>No services available.</p>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: "AllServices",
    data() {
      return {
        services: [],
      };
    },
    created() {
      const servicesFromStorage = localStorage.getItem("services");
      if(servicesFromStorage){
        this.services = JSON.parse(servicesFromStorage)
      }
    },
  };
  </script>
  
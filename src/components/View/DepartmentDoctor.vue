<template>
    <section class="all-departments py-5">
      <div class="container">
        <h2 class="text-center text-orange mb-4">All Departments</h2>
  
        <div class="row">
          <div class="col-md-4 mb-4" v-for="department in departments" :key="department.id">
            <div class="department-details p-3 border rounded">
              <h5 class="text-center">{{ department.name }}</h5>
              <p>{{ department.description }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  </template>
  
  <script>
import { useHead } from '@vueuse/head';

  export default {
    name: 'DepartmentDoctor',
    setup() {
    useHead({
      title: 'Departments - City Hospital',
      meta: [
        { name: 'description', content: 'Explore the departments at City Hospital.' },
        { name: 'keywords', content: 'hospital, departments, medical services' },
      ],
    });
  },
    data() {
      return {
        departments: [
          {
            id: 1,
            name: 'Corona Isolation Unit',
            description: 'This unit handles isolation and treatment for COVID-19 patients.',
          },
          {
            id: 2,
            name: 'Speech Therapy Center',
            description: 'The center provides speech therapy and treatment for speech disorders.',
          },
          {
            id: 3,
            name: 'City Diabetic Center',
            description: 'A specialized center for managing and treating diabetic patients.',
          },
          // Add more departments with detailed descriptions
        ],
      };
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
  
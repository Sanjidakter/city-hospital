<template>
    <div class="text-center">
      <h1>DigitalMarketing Component</h1>
      <p>This is the content of the Marketing component.</p>
    </div>
  </template>
  
  <script>
  export default {
    name: 'DigitalMarketing',
    props: {
      block: Object
    },
  mounted() {
    console.log('DigitalMarketing component mounted:', this.block);
  }
  }
  </script>
  
  <style scoped>
  /* Add styles here if needed */
  </style>
  
<template>
    <div class="text-center">
      <h1>Songzog Component</h1>
      <p>This is the content of the Songzog component.</p>
    </div>
  </template>
  
  <script>
  export default {
    name: 'SongzogCom',
    props: {
      block: Object
    },
  mounted() {
    console.log('SongzogCom component mounted:', this.block);
  }
  }
  </script>
  
  <style scoped>
  /* Add styles here if needed */
  </style>
  
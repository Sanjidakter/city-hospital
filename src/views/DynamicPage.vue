<!-- src/views/DynamicPage.vue -->
<template>
    <div>
      <h2>Dynamic Page for {{ $route.params.alias }}</h2>
      <p>This is the content for the page with alias: {{ $route.params.alias }}</p>
    </div>
  </template>
  
  <script>
  export default {
    props: ['alias'], // If you want to use props
  };
  </script>
  
 
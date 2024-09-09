<template>
    <section :id="block.alias">
      <div class="container">
        <h2>{{ block.title }}</h2>
        <p v-if="block.description">{{ block.description }}</p>
        <div v-if="block.children.length" class="block-items">
          <div v-for="item in block.children" :key="item.id" class="block-item">
            <h3>{{ item.label }}</h3>
            <img :src="item.image_url" alt="block image" v-if="item.image_url" />
            <p v-html="item.fulltext"></p>
            <a :href="item.url" class="btn btn-primary">Read More</a>
          </div>
        </div>
      </div>
    </section>
  </template>
  
  <script>
  export default {
    name: "DynamicSection",
    props: {
      block: {
        type: Object,
        required: true
      }
    }
  };
  </script>
  
  <style scoped>
  .block-item {
    margin-bottom: 20px;
  }
  </style>
  
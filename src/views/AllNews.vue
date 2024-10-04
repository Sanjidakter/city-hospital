<template>
    <div class="page_title">
     <div class="container">
       <div class="row">
         <div class="col-md-12 pt-2">
           <h3 class="font-weight-bold">All News</h3>
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
               All News
               <span class="divider-last">&nbsp;</span>
             </li>
           </ul>
         </div>
       </div>
     </div>
   </div>
   <div class="news-page container text-center">
     <h1>All news</h1>

     <div class="container col-md-6 col-sm-6" v-if="news.length">
       <div class="news-block mb-5 mb-lg-0" v-for="(singleNews, index) in news" :key="index">
         <h3>{{ singleNews.title }}</h3>
         <p>{{ singleNews.fulltext }}</p>
         <img :src="singleNews.image_url" alt="singleNews Image" />
       </div>
     </div>
     <div v-else>
       <p>No news available.</p>
     </div>
   </div>
 </template>
 
 <script>
 export default {
   name: "AllNews",
   data() {
     return {
       news: [],
     };
   },
   created() {
     const newsFromStorage = localStorage.getItem("news")
     if (newsFromStorage) {
       this.news = JSON.parse(newsFromStorage)
     }
   },
 };
 </script>
 
<!-- src/views/DynamicPage.vue -->
<template>
  <div>
    <div class="page_title">
      <div class="container">
        <div class="row">
          <div class="col-md-12 pt-2">
            <h3 class="font-weight-bold">{{ $route.params.alias }}</h3>
            <ul class="breadcrumb">
              <li class="breadcrumb-item">
                <a href="http://cityhospital.techecosys.net/">Home </a
                ><span class="divider">&nbsp;</span>
              </li>
              <li class="breadcrumb-item">
                <a href="http://cityhospital.techecosys.net/pages">Pages</a
                ><span class="divider">&nbsp;</span>
              </li>
              <li class="breadcrumb-item">
                {{ $route.params.alias }}<span class="divider-last">&nbsp;</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <h2>Dynamic Page for {{ $route.params.alias }}</h2>
    <p>
      This is the content for the page with alias: {{ $route.params.alias }}
    </p>
  </div>
</template>

<script>
export default {
  props: ["alias"], // If you want to use props
};
</script>

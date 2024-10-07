<template>
  <div class="page_title">
    <div class="container">
      <div class="row">
        <div class="col-md-12 pt-2">
          <h3 class="font-weight-bold">{{ $route.params.alias }}</h3>
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
              {{ $route.params.alias }}
              <span class="divider-last">&nbsp;</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "PageTitle",
  props: {
    title: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    alias: {
      type: String,
      default: null,
    },
    ShowAlias: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

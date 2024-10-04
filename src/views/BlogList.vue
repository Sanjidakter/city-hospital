<template>
  <div class="page_title">
      <div class="container">
        <div class="row">
          <div class="col-md-12 pt-2">
            <h3 class="font-weight-bold">Blogs</h3>
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
                Blogs
                <span class="divider-last">&nbsp;</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  <section class="section blog-wrap">
    <div class="container mt-2">
      <div class="row">
        <div class="col-lg-8">
          <div class="row">
            <!-- {{ blogs }} -->
            <div
              class="col-lg-12 col-md-12 mb-5"
              v-for="blog in blogs"
              :key="blog.id"
            >
              <div class="blog-item">
                <div class="blog-thumb">
                  <img :src="blog.image_url" alt="" class="img-fluid" />
                </div>

                <div class="blog-item-content">
                  <div class="blog-item-meta mb-3 mt-4">
                    <span class="text-black text-capitalize mr-3"
                      ><i class="icofont-calendar mr-1"></i
                      >{{
                        new Date(blog.updated).getDate() +
                        (["st", "nd", "rd"][
                          ((((new Date(blog.updated).getDate() + 90) % 100) -
                            10) %
                            10) -
                            1
                        ] || "th") +
                        " " +
                        new Date(blog.updated).toLocaleString("default", {
                          month: "long",
                        })
                      }}</span
                    >
                  </div>
                  <h1>{{ blog.id }}</h1>
                  <h2 class="mt-3 mb-3">
                    <a :href="blog.url">{{ blog.alias }}</a>
                  </h2>

                  <p v-html="blog.fulltext" class="mb-4"></p>

                  <a
                    :href="blog.url"
                    target="_blank"
                    class="btn btn-main btn-icon btn-round-full"
                    >Read More <i class="icofont-simple-right ml-2"></i
                  ></a>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-lg-4">
          <div class="sidebar-wrap pl-lg-4 mt-5 mt-lg-0">
            <div class="sidebar-widget latest-post mb-3">
              <h5>Popular Posts</h5>

              <div
                class="py-2"
                v-for="blog in blogs.slice(0, 3)"
                :key="blog.id"
              >
                <span class="text-black text-capitalize mr-3">
                  <i class="icofont-calendar mr-1"></i>
                  {{
                    new Date(blog.updated).toLocaleDateString("en-GB", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    })
                  }}
                </span>
                <h6 class="my-2">
                  <a :href="blog.url">{{ blog.title }}</a>
                </h6>
              </div>
            </div>

            <div class="sidebar-widget category mb-3">
              <h5 class="mb-4">Categories</h5>

              <ul class="list-unstyled">
                <li class="align-items-center">
                  <a href="#">Medicine</a>
                  <span>(14)</span>
                </li>
                <li class="align-items-center">
                  <a href="#">Equipments</a>
                  <span>(2)</span>
                </li>
                <li class="align-items-center">
                  <a href="#">Heart</a>
                  <span>(10)</span>
                </li>
                <li class="align-items-center">
                  <a href="#">Free counselling</a>
                  <span>(5)</span>
                </li>
                <li class="align-items-center">
                  <a href="#">Lab test</a>
                  <span>(5)</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "BlogList",
  data() {
    return {
      blogs: [],
    };
  },
  methods: {
    async fetchBlogDetails() {
      try {
       
        let url =this.$apiBaseUrl+`/website/website_api/contents/blog?access_key=${this.$apiAccessKey}&debug=1`
         
        const response = await fetch(url, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        });

        if (!response.ok) {
          throw new Error(
            `HTTP error! Status blogs not found: ${response.status}`
          );
        }

        const result = await response.json();
        // Assuming the 'doctors' data is in the result, check the structure
        const data = result?.contents
        

        // Assign doctors data to the doctors array
        this.blogs = data;
        console.log("Blogs Data:", data);
      } catch (error) {
        console.error("Error fetching blogs details:", error);
      }
    },
  },
  mounted() {
    this.fetchBlogDetails();
  },
};
</script>

<template>
  <div v-if="content">
    <PageTitle
      :title="content.title"
      :type="contentType"
      :alias="alias"
      :ShowAlias="true"
    />
    <div
      :class="{ container: isContainer, 'full-width': isFullWidth }"
      class="py-5"
    >
      <div class="row">
        <!-- Main Content -->
        <div :class="mainContentClass">
          <!-- Title and Meta -->
          <div v-if="!content.page_setting.is_hide_title" class="mb-3">
            <h1
              style="font-size: 30px; line-height: 40px; font-weight: 500"
              class="details-title"
            >
              {{ content.title }}
            </h1>
            <p class="text-muted">
              <i class="icon far fa-calendar-alt" style="margin-right: 5px"></i>
              <a> {{ formatDate(content.publish_date) }}</a>
            </p>
            <hr />
          </div>
          <!-- Featured Image -->
          <!-- {{ content.page_setting }} -->
          <div v-if="!content.page_setting.is_hide_featured_image" class="mb-4">
            <img
              :src="content.image_url"
              :alt="content.title"
              :title="content.title"
              class="img-fluid"
              style="border-radius: 20px"
            />
          </div>

          <!-- Full Text Content -->
          <div v-html="content.fulltext" class="content-text mb-5"></div>
        </div>

        <!-- Sidebar -->
        <div v-if="hasSidebar" :class="sidebarClass">
          <div class="sidebar-section mb-4">
            <h5 class="sidebar-title">{{ contentType }}</h5>
            <div
              v-for="post in popularPosts"
              :key="post.title"
              class="sidebar-item d-flex mb-3"
            >
              <img
                :src="post.image_url"
                class="sidebar-thumb me-3"
                alt="popular post"
                style="border-radius: 20px"
              />
              <div>
                <p class="sidebar-post-title">{{ post.title }}</p>
                <p class="sidebar-meta text-muted">
                  <i
                    class="icon far fa-calendar-alt"
                    style="margin-right: 5px"
                  ></i>
                  {{ formatDate(post.publish_date) }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div v-else>
    <p>Loading...</p>
  </div>
</template>

<script>
import PageTitle from "./PageTitle.vue";

export default {
  props: ["alias", "contentType"],
  components: {
    PageTitle,
  },
  data() {
    return {
      content: null,
      error: null,
      popularPosts: [],
    };
  },
  computed: {
    isContainer() {
      return this.content.page_template_column !== "full_width";
    },
    isFullWidth() {
      return this.content.page_template_column === "full_width";
    },
    mainContentClass() {
      switch (this.content.page_template_column) {
        case "one_column":
          return "col-lg-12";
        case "two_column_leftbar":
          return "col-lg-9";
        case "two_column_rightbar":
          return "col-lg-9";
        default:
          return "col-lg-12";
      }
    },
    hasSidebar() {
      return ["two_column_leftbar", "two_column_rightbar"].includes(
        this.content.page_template_column
      );
    },
    sidebarClass() {
      return this.content.page_template_column === "two_column_leftbar"
        ? "col-lg-3 order-lg-1"
        : "col-lg-3 order-lg-2";
    },
  },
  created() {
    this.fetchSinglePage();
    this.fetchContentList();
  },
  methods: {
    async fetchSinglePage() {
      try {
        const response = await fetch(
          `${this.$apiBaseUrl}website/website_api/content/${this.alias}?access_key=${this.$apiAccessKey}&debug=1`
        );
        const data = await response.json();
        if (response.ok) {
          this.content = data.content;
        } else {
          this.error =
            data.message || `Error fetching ${this.contentType} details`;
        }
      } catch (err) {
        this.error = "Network error, please try again later.";
      }
    },
    async fetchContentList() {
      try {
        const response = await fetch(
          `${this.$apiBaseUrl}website/website_api/contents/${this.contentType}?access_key=${this.$apiAccessKey}&debug=1`
        );
        const data = await response.json();
        if (response.ok) {
          this.popularPosts = data.contents;
        } else {
          this.error =
            data.message || `Error fetching ${this.contentType} list`;
        }
      } catch (err) {
        this.error = "Network error, please try again later.";
      }
    },
    formatDate(dateStr) {
      const options = { year: "numeric", month: "long", day: "numeric" };
      return new Date(dateStr).toLocaleDateString(undefined, options);
    },
  },
};
</script>

<style scoped>
.container {
  max-width: 1140px;
}

.full-width {
  width: 100%;
}

.details-title {
  font-size: 2rem;
  font-weight: bold;
}

.content-text {
  font-size: 1rem;
  line-height: 1.6;
}

.sidebar-section {
  border-radius: 20px;
  background-color: #f6f8f9;
  margin-bottom: 30px;
  padding: 25px 30px 30px 30px;
}

.sidebar-title {
  font-size: 1.25rem;
  font-weight: bold;
  margin-bottom: 1rem;
}

.sidebar-item {
  display: flex;
}

.sidebar-thumb {
  width: 60px;
  height: 60px;
  object-fit: cover;
  border-radius: 4px;
}

.sidebar-post-title {
  font-size: 0.9rem;
  font-weight: bold;
}

.sidebar-meta {
  font-size: 0.8rem;
}

.category-item {
  font-size: 0.9rem;
}
</style>
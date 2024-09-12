<template>
  <header class="sticky-top">
    <div class="header">
      <div class="branding d-flex align-items-center">
        <div
          class="container position-relative d-flex align-items-center justify-content-end"
        >
          <nav id="navmenu" class="navmenu d-flex align-items-center me-auto">
            <ul>
              <!-- Loop through menu items -->
              <li
                v-for="item in menuItems"
                :key="item.id"
                class="nav-item"
                :class="{ dropdown: item.children && item.children.length > 0 }"
              >
                <!-- If the item has children, show dropdown -->
                <template v-if="item.children && item.children.length > 0">
                  <a
                    href="#"
                    class="nav-link dropdown-toggle"
                    @click.prevent="toggleDropdown"
                  >
                    {{ item.label }}
                  </a>
                  <ul class="dropdown-menu">
                    <li
                      v-for="child in item.children"
                      :key="child.id"
                      class="dropdown-item"
                    >
                      <router-link :to="`/${child.link}`" @click="closeMobileMenu">{{ child.label }}</router-link>
                    </li>
                  </ul>
                </template>

                <!-- Otherwise, show a regular menu item -->
                <template v-else>
                  <router-link :to="`/${item.link}`" class="nav-link" @click="closeMobileMenu">
                    {{ item.label }}
                  </router-link>
                </template>
              </li>
            </ul>
            <i class="mobile-nav-toggle d-xl-none bi bi-list"></i>
          </nav>

          <a class="cta-btn" href="#">Call for Appointment</a>
          <a
            class="cta-btn btn_white"
            href="http://cityhospital.techecosys.net//post/110/our-doctors"
          >
            Find a Doctor
          </a>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  name: "HeaderPart",
  data() {
    return {
      widgets: null,
      menuItems: [], // Array to hold menu items
    };
  },
  mounted() {
    this.loadMenuItems();
    this.initializeMobileMenu();
  },
  methods: {
    loadMenuItems() {
      const storedWidgets = localStorage.getItem("widgets");
      if (storedWidgets) {
        this.widgets = JSON.parse(storedWidgets);
        if (this.widgets && this.widgets.menu && this.widgets.menu.main_menu) {
          this.menuItems = this.widgets.menu.main_menu.map((item) => ({
            id: item.id,
            alias: item.alias,
            link: item.link,
            label: item.label,
            url: `${item.url}${item.link}`,
            children: item.children || [], // Include children for dropdown
          }));
        }
      }
    },
    initializeMobileMenu() {
      // Mobile nav toggle
      const mobileNavToggleBtn = document.querySelector('.mobile-nav-toggle');
      if (mobileNavToggleBtn) {
        mobileNavToggleBtn.addEventListener('click', this.mobileNavToggle);
      }

      // Hide mobile nav on same-page/hash links
      document.querySelectorAll('#navmenu a').forEach(navmenu => {
        navmenu.addEventListener('click', () => {
          if (document.querySelector('body').classList.contains('mobile-nav-active')) {
            this.mobileNavToggle();
          }
        });
      });
    },
    mobileNavToggle() {
      document.querySelector('body').classList.toggle('mobile-nav-active');
      const mobileNavToggleBtn = document.querySelector('.mobile-nav-toggle');
      if (mobileNavToggleBtn) {
        mobileNavToggleBtn.classList.toggle('bi-x');
        mobileNavToggleBtn.classList.toggle('bi-');
      }
    },
    closeMobileMenu() {
  console.log('Menu item clicked');
  document.querySelector('body').classList.remove('mobile-nav-active');
  const mobileNavToggleBtn = document.querySelector('.mobile-nav-toggle');
  if (mobileNavToggleBtn) {
    mobileNavToggleBtn.classList.remove('bi-x');
    mobileNavToggleBtn.classList.add('bi-list');
  }
},
    toggleDropdown(event) {
      event.preventDefault();
      const dropdownMenu = event.currentTarget.nextElementSibling;
      if (dropdownMenu) {
        dropdownMenu.classList.toggle('dropdown-active');
      }
    }
  }
};
</script>

<style scoped>
/* Add styles for dropdowns and mobile nav toggle */
.dropdown-menu {
  display: none;
}

.dropdown-menu.dropdown-active {
  display: block;
}

/* Mobile nav active styles */
body.mobile-nav-active .navmenu {
  /* Adjust styles for active mobile nav menu */
}

/* Mobile nav toggle icon styles */
.mobile-nav-toggle.bi-x {
  /* Adjust styles for close icon */
}
</style>

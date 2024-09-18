<template>
  <main class="main">
    <section>
      <div class="container">
        <div class="row">
          <!-- Contact Information -->
          <div class="col-md-6 my-2">
            <div class="container">
              <div class="p-3" v-html="contactContent.fulltext"></div>
            </div>
          </div>

          <!-- Contact Form -->
          <div class="col-md-6 my-2">
            <form @submit.prevent="handleSubmit" class="form-horizontal">
              <fieldset>
                <div class="form-row">
                  <div class="form-group col-md-12 m-2">
                    <input
                      v-model="form.first_name"
                      required
                      type="text"
                      class="form-control"
                      id="first_name"
                      placeholder="Your First Name"
                    />
                  </div>
                  <div class="form-group col-md-12 m-2">
                    <input
                      v-model="form.phone"
                      required
                      type="text"
                      class="form-control"
                      id="phone"
                      placeholder="Mobile"
                    />
                  </div>
                </div>

                <div class="form-row">
                  <div class="form-group col-md-12 m-2">
                    <input
                      v-model="form.email"
                      required
                      type="email"
                      class="form-control"
                      id="email"
                      placeholder="Your Email"
                    />
                  </div>
                </div>

                <div class="form-group m-2">
                  <textarea
                    v-model="form.message"
                    required
                    class="form-control"
                    id="message"
                    rows="5"
                    placeholder="Your Message"
                  ></textarea>
                </div>
                <button type="submit" class="btn btn-primary m-2">
                  Send Message
                </button>
              </fieldset>
            </form>
          </div>
        </div>
      </div>
    </section>

    <!-- Google Map Section -->
    <section id="contact_3" class="contact_3">
      <div class="container">
        <div class="text-center pb-5">
          <h1 class="text-uppercase section_title">
            <strong>If more, please contact us</strong>
          </h1>
        </div>
        <div class="row">
          <div class="col-md-12">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3651.8139728049614!2d90.3629092115846!3d23.7540122885475!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755bf50803e1049%3A0x4ffdcb849beb0640!2sCity%20Hospital%20%26%20Diagnostic%20Center!5e0!3m2!1sen!2sbd!4v1726481566444!5m2!1sen!2sbd"
              width="100%"
              height="450"
              style="border: 0"
              allowfullscreen=""
              loading="lazy"
              referrerpolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>

<script>
export default {
  data() {
    return {
      form: {
        first_name: "",
        phone: "",
        email: "",
        message: "",
      },
      contactContent: {}, // To store the contact content from the API
      baseUrl:process.env.APP_BASE_API_URL,
      proxyUrl: "https://api.allorigins.win/raw?url=", // Proxy URL for bypassing CORS
    };
  },
  methods: {
    async fetchContactInfo() {
      try {
        const apiUrl =
          this.proxyUrl +
          encodeURIComponent(
            "http://cityhospital.techecosys.net/website/website_api/content/contact-us?access_key=123456789&debug=1"
          );
        const response = await fetch(apiUrl);
        const data = await response.json();
        this.contactContent = data.content;
      } catch (error) {
        console.error("Error fetching contact content:", error);
      }
    },
    handleSubmit() {
      // Handle form submission logic
      console.log("Form Submitted:", this.form);
      // Add your API call or form handling logic here
    },
  },
  mounted() {
    this.fetchContactInfo();
  },
};
</script>

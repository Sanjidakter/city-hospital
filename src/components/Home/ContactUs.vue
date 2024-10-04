<template>
  <main class="main">
    <section>
  <div class="container">
    <div class="row d-flex">
      <!-- Contact Information -->
      <div class="col-md-6 my-2">
        <div class="p-3" v-html="contactContent.fulltext"></div>
      </div>

      <!-- Contact Form -->
      <div class="col-md-6 my-2">
        <div class="alert alert-success" v-if="isSubmitted">
          <h2 class="text-success">Successfully submitted !</h2>
        </div>
        <div v-else>
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
                    v-model="form.last_name"
                    required
                    type="text"
                    class="form-control"
                    id="last_name"
                    placeholder="Your Last Name"
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


              <div class="form-group col-md-12 m-2">
                <select
                  v-model="form.feedback_type_id"
                  required
                  class="form-control"
                >
                  <option disabled value="">Select Feedback Type</option>
                  <option value="1">General Query</option>
                  <option value="2">Appointment</option>
                  <option value="3">OT Related</option>
                </select>
              </div>

              <!-- Send Copy to Yourself -->
              <div class="form-group col-md-12 m-2">
                <input
                  v-model="form.send_copy_to_yourself"
                  type="checkbox"
                  id="send_copy_to_yourself"
                />
                <label class="m-2" for="send_copy_to_yourself">
                  Send copy to yourself
                </label>
              </div>

              <!-- Message -->
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

              <!-- Submit Button -->
              <button type="submit" class="btn btn-primary m-2">
                Send Message
              </button>
            </fieldset>
          </form>
        </div>
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
        last_name: "",
        phone: "",
        email: "",
        message: "",
        feedback_type_id: "",
        send_copy_to_yourself: false,
        ip: "",
      },
      isSubmitted: false,
      contactContent: {}, // To store the contact content from the API
      
    };
  },
  methods: {
    async fetchContactInfo() {
      try {
        const apiUrl =
          this.$apiBaseUrl +
          "/website/website_api/content/contact-us?access_key=" +
          this.$apiAccessKey +
          "&debug=1";

        const response = await fetch(apiUrl);
        const data = await response.json();
        this.contactContent = data.content;
      } catch (error) {
        console.error("Error fetching contact content:", error);
      }
    },
    async handleSubmit() {
      // Handle form submission logic
      const formData = new FormData();
      formData.append("first_name", this.form.first_name);
      formData.append("last_name", this.form.last_name);
      formData.append("email", this.form.email);
      formData.append("phone", this.form.phone);
      formData.append("message", this.form.message);
      formData.append("feedback_type_id", this.form.feedback_type_id); // Adding the feedback type ID
      formData.append("send_copy_to_yourself", this.form.send_copy_to_yourself);
      formData.append("ip", this.form.ip);

      const apiUrl =
        this.$apiBaseUrl +
        "/website/website_api/feedback?access_key=" +
        this.$apiAccessKey;

      try {
        const response = await fetch(apiUrl, {
          method: "POST",
          body: formData,
        });

        const result = await response.json();

        if (response.ok) {
          // Clear the form inputs after successful submission
          this.isSubmitted = true;
          this.resetForm();
        } else {
          console.error(result);
        }
      } catch (error) {
        console.error("Error submitting feedback:", error);
      }
    },
    // Method to reset form fields
    resetForm() {
      this.form = {
        first_name: "",
        last_name: "",
        phone: "",
        email: "",
        message: "",
        feedback_type_id: "",
        send_copy_to_yourself: false,
        ip: "",
      };
    },
  },
  mounted() {
    this.fetchContactInfo();
  },
};
</script>

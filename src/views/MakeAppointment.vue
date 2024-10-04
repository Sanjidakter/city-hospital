<template>
    <div class="page_title">
      <div class="container">
        <div class="row">
          <div class="col-md-12 pt-2">
            <h3 class="font-weight-bold">Appoinment</h3>
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
                Appoinment
                <span class="divider-last">&nbsp;</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <div class="col-md-6 my-2 container">
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

                <!-- Feedback Type Dropdown -->
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

                <div class="form-group col-md-12 m-2">
                  <input
                    v-model="form.send_copy_to_yourself"
                    type="checkbox"
                    id="send_copy_to_yourself"
                  />
                  <label class="m-2" for="send_copy_to_yourself"
                    >Send copy to yourself</label
                  >
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
                  Book Appoinment
                </button>
              </fieldset>
            </form>
          </div>
</template>

<script>
export default {
  name: "MakeAppointment",
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
      contactContent: {}, // To store the contact content from the API
      // Proxy URL for bypassing CORS
    };
  },
  methods: {
   
    async handleSubmit() {
      // Handle form submission logic
      const formData = new FormData();
      formData.append("first_name", this.form.first_name);
      formData.append("last_name", this.form.last_name);
      formData.append("email", this.form.email);
      formData.append('phone', this.form.phone);
      formData.append("message", this.form.message);
      formData.append("feedback_type_id", this.form.feedback_type_id); // Adding the feedback type ID
      formData.append('send_copy_to_yourself',this.form.send_copy_to_yourself);
      formData.append("ip",this.form.ip);

      const apiUrl =
        this.$apiBaseUrl +
        "/website/website_api/feedback?access_key=" +
        this.$apiAccessKey;

      // Add your API call or form handling logic here
      try {
        const response = await fetch(apiUrl, {
          method: "POST",
          body: formData,
        });

        const result = await response.json();

        if (response.ok) {
          alert("Feedback submitted successfully!");
          // Clear the form inputs after successful submission
          this.resetForm();
        } else {
          alert("Failed to submit feedback");
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
};
</script>

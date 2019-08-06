<template>
  <div id="employee-form">
    <form @submit.prevent="handleSubmit">
      <div class="form-group">
        <label for="name">Employee name</label>
        <input
          v-model="employee.name"
          @focus="clearStatus"
          @keypress="clearStatus"
          type="text"
          name="name"
          id="name"
          ref="first"
          class="form-control"
          placeholder="Name"
          aria-describedby="helpName"
        />
        <small id="helpName" class="text-muted">The name of the employee</small>
      </div>
      <div class="form-group">
        <label for="email">Employee email</label>
        <input
          v-model="employee.email"
          @focus="clearStatus"
          type="email"
          name="email"
          id="email"
          class="form-control"
          placeholder="Email"
          aria-describedby="helpEmail"
        />
        <small id="helpEmail" class="text-muted">The email of the employee</small>
      </div>
      <p v-if="error && submitting" class="error-message">!Please fill out all required fields</p>
      <p v-if="success" class="success-message">Employee successfully added</p>      
      <button type="submit" class="btn btn-success">Add Employee</button>
    </form>
  </div>
</template>
<script>
export default {
  name: "employee-form",
  data() {
    return {
      submitting: false,
      error: false,
      success: false,
      employee: {
        name: "",
        email: ""
      }
    };
  },

  methods: {
    handleSubmit() {
      this.submitting = true;
      this.clearStatus();

      if (this.invalidName || this.invalidEmail) {
        this.error = true;
        return;
      }

      this.$emit("add:employee", this.employee);
      this.$refs.first.focus();
      this.employee.name = "";
      this.employee.email = "";

      this.error = false;
      this.success = true;
      this.submitting = false;
    },

    clearStatus() {
      this.success = false;
      this.error = false;
    }
  },

  computed: {
    invalidName: function() {
      return this.employee.name === "";
    },

    invalidEmail: function() {
      return this.employee.email === "";
    }
  }
};
</script>
<style scoped>
[class*="-message"] {
  font-weight: 500;
}

.error-message {
  color: #d33c40;
}

.success-message {
  color: #32a95d;
}
</style>


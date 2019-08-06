<template>
  <div id="employee-table">
    <p v-if="employees.length < 1">No employees</p>
    <table v-else class="table table-striped table-hover table-bordered rounded">
      <thead>
        <tr>
          <th scope="col">Employee name</th>
          <th scope="col">Employee email</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="employee in employees" :key="employee.id">
          <td v-if="editing === employee.id">
            <input type="text" class="form-control" v-model="employee.name" />
          </td>
          <td v-else>{{ employee.name }}</td>

          <td v-if="editing === employee.id">
            <input type="email" class="form-control" v-model="employee.email" />
          </td>
          <td v-else>{{ employee.email }}</td>

          <td v-if="editing === employee.id">
            <button class="btn btn-primary m-1" @click="editEmployee(employee)">Save</button>
            <button class="btn btn-danger m-1" @click="cancelEdit(employee)">Cancel</button>
          </td>
          <td v-else>
            <button class="btn btn-primary m-1" @click="editMode(employee)">Edit</button>
            <button class="btn btn-danger m-1" @click="$emit('delete:employee', employee.id)">Delete</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script>
export default {
  name: "employee-table",
  props: {
    employees: Array
  },
  data() {
    return {
      editing: null,
      cachedEmployee : {},
    };
  },
  methods: {
    editMode(employee) {
      this.editing = employee.id;
      this.cachedEmployee = Object.assign({}, employee);
    },

    editEmployee(employee) {
      if (employee.name === "" || employee.email === "") return;
      this.$emit("edit:employee", employee.id, employee);
      this.editing = null;
    },
    
    cancelEdit(employee){
      Object.assign(employee, this.cachedEmployee);
      this.editing = null;
    }
  }
};
</script>
<style scoped>
</style>


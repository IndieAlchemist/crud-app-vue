<template>
  <div id="app" class="container">
    <h1>Employees</h1>
    <employee-form @add:employee="addEmployee" />
    <br />
    <employee-table
      v-bind:employees="employees"
      @delete:employee="deleteEmployee"
      @edit:employee="editEmployee"
    />
  </div>
</template>

<script>
import EmployeeTable from "./components/EmployeeTable";
import EmployeeForm from "./components/EmployeeForm";

export default {
  name: "app",
  components: {
    EmployeeTable,
    EmployeeForm
  },
  data() {
    return {
      employees: []
    };
  },
  methods: {
    async getEmployees() {
      try {
        const response = await fetch(
          "http://localhost:3030/employees"
        );
        const data = await response.json();
        this.employees = data;
      } catch (error) {
        console.error(error);
      }
    },

    async addEmployee(employee) {
      try {
        const response = await fetch("http://localhost:3030/employees", {
          method: 'POST',
          body: JSON.stringify(employee),
          headers: { 'Content-type': 'application/json; charset=UTF-8' },
        });
        const data = await response.json();
        this.employees = [...this.employees, data];
      } catch (error) {
        console.error(error);
      }
    },

    async deleteEmployee(id) {
      try {
        await fetch(`http://localhost:3030/employees/${id}`, {
          method: 'DELETE'
        });
        this.employees = this.employees.filter(employee => employee.id !== id);
        console.log(this.employees);
      } catch (error) {
        console.error(error);
      }
    },

    async editEmployee(id, updatedEmployee) {
      try {
        const response = await fetch(`http://localhost:3030/employees/${id}`, {
          method: 'PUT',
          body: JSON.stringify(updatedEmployee),
          headers: { 'Content-type': 'application/json; charset=UTF-8' },
        });
        const data = await response.json();
        this.employees = this.employees.map(employee => employee.id === id ? data : employee);
      } catch (error) {
        console.error(error);
      }
      
    }
  },
  mounted(){
    this.getEmployees();
  }
};
</script>

<style>
</style>

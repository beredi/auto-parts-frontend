<template>
  <div>
    <table class="table table-striped">
      <thead>
        <tr>
          <th>Show</th>
          <th>Name</th>
          <th>Registration Number</th>
          <th>Is Registered</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="car in cars" :key="car.id">
          <td>
            <button class="btn btn-outline-primary rounded-circle">SHOW</button>
          </td>
          <td>{{ car.name }}</td>
          <td>{{ car.registration_number }}</td>
          <td>{{ car.is_registered }}</td>
          <td>
            <button @click="editCar(car)" class="btn btn-warning mx-1">
              <i class="fas fa-edit"></i> Edit
            </button>
            <button @click="deleteCar(car)" class="btn btn-danger mx-1">
              <i class="fas fa-trash-alt"></i> Delete
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  props: {
    cars: Array,
  },
  methods: {
    editCar(car) {
      this.$emit("edit-car", car);
    },
    deleteCar(car) {
      this.$emit("delete-car", car);
    },
  },
};
</script>

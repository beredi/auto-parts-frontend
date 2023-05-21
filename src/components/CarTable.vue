<template>
  <div>
    <table class="table">
      <thead>
      <tr>
        <th>ID</th>
        <th>Name</th>
        <th>Registration Number</th>
        <th>Is Registered</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="car in cars" :key="car.id">
        <td>{{ car.id }}</td>
        <td>{{ car.name }}</td>
        <td>{{ car.registration_number }}</td>
        <td>{{ car.is_registered }}</td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  props: {
    cars: Array // Accepts the array of cars as a prop
  }
}
</script>

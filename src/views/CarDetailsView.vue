<template>
  <div class="container">
    <h2>Car Information</h2>
    <router-link to="/" class="btn btn-info text-white">
      <i class="fas fa-chevron-left"></i> Back to Cars
    </router-link>

    <template v-if="car">
      <p><strong>Name:</strong> {{ car.name }}</p>
      <p><strong>Registration Number:</strong> {{ car.registration_number }}</p>
      <p><strong>Is Registered:</strong> {{ car.is_registered }}</p>

      <parts-table v-if="car.parts" :parts="car.parts"></parts-table>
    </template>
    <template v-else>
      <p>Loading car information...</p>
    </template>
  </div>
</template>

<script>
import PartsTable from "@/components/PartsTable";

export default {
  components: {
    PartsTable,
  },
  data() {
    return {
      car: null,
    };
  },
  created() {
    const carId = this.$route.params.id;
    fetch(`http://127.0.0.1:8000/api/cars/${carId}`)
      .then((response) => response.json())
      .then((data) => {
        this.car = data.data;
      })
      .catch((error) => {
        console.error("Error fetching car:", error);
      });
  },
};
</script>

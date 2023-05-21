<template>
  <div class="container">
    <h2>Car Information</h2>
    <p><strong>Name:</strong> {{ car.name }}</p>
    <p><strong>Registration Number:</strong> {{ car.registration_number }}</p>
    <p><strong>Is Registered:</strong> {{ car.is_registered }}</p>
    <router-link to="/" class="btn btn-info text-white"
      ><i class="fas fa-chevron-left"></i> Back to Cars</router-link
    >
  </div>
</template>

<script>
export default {
  data() {
    return {
      car: null,
    };
  },
  created() {
    const carId = this.$route.params.id;
    this.car = {
      id: carId,
      name: "Car 1",
      registration_number: "ABC123",
      is_registered: true,
    };
  },
};
</script>

<template>
  <div class="home">
    <h1>Cars</h1>
    <car-table :cars="cars"></car-table>
  </div>
</template>

<script>
import CarTable from '@/components/CarTable.vue';

export default {
  name: 'HomeView',
  components: {
    CarTable
  },
  data() {
    return {
      cars: [] // Initialize an empty array for cars
    }
  },
  mounted() {
    this.fetchCars(); // Call the fetchCars method when the component is mounted
  },
  methods: {
    fetchCars() {
      // Make an API request to fetch the cars data
      fetch('http://127.0.0.1:8000/api/cars')
          .then(response => response.json())
          .then(data => {
            this.cars = data.data; // Update the cars data in the component
          })
          .catch(error => {
            console.error(error);
          });
    }
  }
}
</script>

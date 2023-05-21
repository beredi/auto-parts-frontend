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

      <div>
        <button class="btn btn-success" @click="openAddPartDialog">
          <i class="fas fa-plus"></i> Add Part
        </button>
      </div>
      <parts-table v-if="car.parts" :parts="car.parts"></parts-table>

      <dialog :open="isAddPartDialogOpen" @close="resetAddPartForm">
        <div class="row">
          <div class="d-flex flex-row justify-content-end mb-3">
            <button @click="resetAddPartForm" class="btn-sm btn-close"></button>
          </div>
        </div>
        <div class="row">
          <form
            @submit.prevent="addPart"
            class="d-flex flex-column align-items-center"
          >
            <h3>Add New Part</h3>
            <div class="form-group py-2">
              <input
                v-model="newPart.name"
                type="text"
                placeholder="Name"
                class="form-control"
                required
              />
            </div>
            <div class="form-group py-2">
              <input
                v-model="newPart.serial_number"
                type="text"
                placeholder="Serial Number"
                class="form-control"
              />
            </div>
            <div class="btn-group py-2">
              <button type="submit" class="btn btn-outline-success">Add</button>
            </div>
          </form>
        </div>
      </dialog>
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
      isAddPartDialogOpen: false,
      newPart: {
        name: "",
        serial_number: "",
      },
    };
  },
  created() {
    this.fetchCarData();
  },
  methods: {
    fetchCarData() {
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
    openAddPartDialog() {
      this.isAddPartDialogOpen = true;
    },
    resetAddPartForm() {
      this.isAddPartDialogOpen = false;
      this.newPart = {
        name: "",
        serial_number: "",
      };
    },
    addPart() {
      const carId = this.$route.params.id;
      const partData = {
        name: this.newPart.name,
        serial_number: this.newPart.serial_number,
        car_id: carId,
      };

      fetch("http://127.0.0.1:8000/api/parts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(partData),
      })
        .then((response) => response.json())
        .then(() => {
          this.resetAddPartForm();
          this.fetchCarData();
        })
        .catch((error) => {
          console.error("Error adding part:", error);
        });
    },
  },
};
</script>

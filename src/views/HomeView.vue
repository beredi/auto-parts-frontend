<template>
  <div class="container">
    <h1>Cars</h1>
    <button @click="openAddCarDialog" class="btn btn-success">
      <i class="fas fa-plus"></i> Add Car
    </button>
    <car-table
      :cars="cars"
      @edit-car="openEditCarDialog"
      @delete-car="deleteCar"
    ></car-table>
    <dialog :open="isAddCarDialogOpen" @close="resetAddCarForm">
      <div class="row">
        <div class="d-flex flex-row justify-content-end mb-3">
          <button @click="resetAddCarForm" class="btn-sm btn-close"></button>
        </div>
      </div>
      <div class="row">
        <form
          @submit.prevent="addCar"
          class="d-flex flex-column align-items-center"
        >
          <h3>Add new car</h3>
          <div class="form-group py-2">
            <input
              v-model="newCar.name"
              type="text"
              placeholder="Name"
              class="form-control"
              required
            />
          </div>
          <div class="form-group py-2">
            <input
              v-model="newCar.registration_number"
              type="text"
              placeholder="Registration Number"
              class="form-control"
            />
          </div>
          <div class="form-group py-2">
            <label>
              <input v-model="newCar.is_registered" type="checkbox" /> Is
              Registered
            </label>
          </div>
          <div class="btn-group py-2">
            <button type="submit" class="btn btn-outline-success">Add</button>
          </div>
        </form>
      </div>
    </dialog>

    <dialog :open="isEditCarDialogOpen" @close="resetEditCarForm">
      <div class="row">
        <div class="d-flex flex-row justify-content-end mb-3">
          <button @click="resetEditCarForm" class="btn-sm btn-close"></button>
        </div>
      </div>
      <div class="row">
        <form
          @submit.prevent="updateCar"
          class="d-flex flex-column align-items-center"
        >
          <h3>Update car</h3>
          <div class="form-group py-2">
            <input
              v-model="editCar.name"
              type="text"
              placeholder="Name"
              class="form-control"
              required
            />
          </div>
          <div class="form-group py-2">
            <input
              v-model="editCar.registration_number"
              type="text"
              placeholder="Registration Number"
              class="form-control"
            />
          </div>
          <div class="form-group py-2">
            <label>
              <input v-model="editCar.is_registered" type="checkbox" />
              Is Registered
            </label>
          </div>
          <div class="btn-group py-2">
            <button type="submit" class="btn btn-outline-warning">
              Update
            </button>
          </div>
        </form>
      </div>
    </dialog>
  </div>
</template>

<script>
import CarTable from "@/components/CarTable";

export default {
  name: "HomeView",
  components: {
    CarTable,
  },
  data() {
    return {
      cars: [],
      isAddCarDialogOpen: false,
      newCar: {
        name: "",
        registration_number: "",
        is_registered: false,
      },
      isEditCarDialogOpen: false,
      editCar: {
        id: null,
        name: "",
        registration_number: "",
        is_registered: false,
      },
    };
  },
  mounted() {
    this.fetchCars();
  },
  methods: {
    fetchCars() {
      fetch("http://127.0.0.1:8000/api/cars")
        .then((response) => response.json())
        .then((data) => {
          this.cars = data.data;
        })
        .catch((error) => {
          console.error(error);
        });
    },
    openAddCarDialog() {
      this.isAddCarDialogOpen = true;
    },
    resetAddCarForm() {
      this.newCar.name = "";
      this.newCar.registration_number = "";
      this.newCar.is_registered = false;
      this.isAddCarDialogOpen = false;
    },
    addCar() {
      fetch("http://127.0.0.1:8000/api/cars", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(this.newCar),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("Car added:", data);
          this.fetchCars();
          this.resetAddCarForm();
        })
        .catch((error) => {
          console.error("Error adding car:", error);
        });
    },
    openEditCarDialog(car) {
      this.editCar.id = car.id;
      this.editCar.name = car.name;
      this.editCar.registration_number = car.registration_number;
      this.editCar.is_registered = car.is_registered;
      this.isEditCarDialogOpen = true;
    },
    deleteCar(car) {
      if (confirm(`Are you sure you want to delete the car ${car.name}?`)) {
        const url = `http://127.0.0.1:8000/api/cars/${car.id}`;
        fetch(url, {
          method: "DELETE",
        })
          .then(() => {
            console.log("Car deleted:", car);
            this.fetchCars();
          })
          .catch((error) => {
            console.error("Error deleting car:", error);
          });
      }
    },
    resetEditCarForm() {
      this.editCar.id = null;
      this.editCar.name = "";
      this.editCar.registration_number = "";
      this.editCar.is_registered = false;
      this.isEditCarDialogOpen = false;
    },
    updateCar() {
      const url = `http://127.0.0.1:8000/api/cars/${this.editCar.id}`;
      fetch(url, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(this.editCar),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("Car updated:", data);
          this.fetchCars();
          this.resetEditCarForm();
        })
        .catch((error) => {
          console.error("Error updating car:", error);
        });
    },
  },
};
</script>

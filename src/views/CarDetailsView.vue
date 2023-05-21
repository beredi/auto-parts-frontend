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
      <parts-table
        v-if="car.parts && car.parts.length > 0"
        :parts="car.parts"
        @edit-part="openEditPartDialog"
        @delete-part="deletePart"
      ></parts-table>

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
              <button type="submit" class="btn btn-outline-success">
                <i class="fas fa-plus"></i> Add
              </button>
              <button
                type="button"
                @click="resetAddPartForm"
                class="btn btn-outline-secondary"
              >
                <i class="fas fa-times"></i> Cancel
              </button>
            </div>
          </form>
        </div>
      </dialog>

      <dialog :open="isEditPartDialogOpen" @close="resetEditPartForm">
        <div class="row">
          <div class="d-flex flex-row justify-content-end mb-3">
            <button
              @click="resetEditPartForm"
              class="btn-sm btn-close"
            ></button>
          </div>
        </div>
        <div class="row">
          <form
            @submit.prevent="updatePart"
            class="d-flex flex-column align-items-center"
          >
            <h3>Edit Part</h3>
            <div class="form-group py-2">
              <input
                v-model="editPart.name"
                type="text"
                placeholder="Name"
                class="form-control"
                required
              />
            </div>
            <div class="form-group py-2">
              <input
                v-model="editPart.serial_number"
                type="text"
                placeholder="Serial Number"
                class="form-control"
              />
            </div>
            <div class="btn-group py-2">
              <button type="submit" class="btn btn-outline-warning">
                <i class="fas fa-check"></i> Update
              </button>
              <button
                type="button"
                @click="resetEditPartForm"
                class="btn btn-outline-secondary"
              >
                <i class="fas fa-times"></i> Cancel
              </button>
            </div>
          </form>
        </div>
      </dialog>
    </template>

    <template v-else>
      <p v-if="!isLoading">Loading car details...</p>
    </template>
  </div>
</template>

<script>
import PartsTable from "@/components/PartsTable.vue";

export default {
  name: "CarDetailsView",
  components: {
    PartsTable,
  },
  data() {
    return {
      isAddPartDialogOpen: false,
      isEditPartDialogOpen: false,
      newPart: {
        name: "",
        serial_number: "",
      },
      editPart: {
        id: "",
        name: "",
        serial_number: "",
      },
      car: null,
      isLoading: true,
    };
  },
  mounted() {
    this.fetchCarDetails();
  },
  methods: {
    fetchCarDetails() {
      const carId = this.$route.params.id;
      fetch(`http://127.0.0.1:8000/api/cars/${carId}`)
        .then((response) => {
          if (response.ok) {
            return response.json();
          } else {
            throw new Error("Failed to fetch car details");
          }
        })
        .then((data) => {
          this.car = data.data;
          this.isLoading = false;
        })
        .catch((error) => {
          console.error("Failed to fetch car details:", error);
          this.isLoading = false;
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
      const newPart = {
        name: this.newPart.name,
        serial_number: this.newPart.serial_number,
        car_id: carId,
      };

      fetch("http://127.0.0.1:8000/api/parts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newPart),
      })
        .then((response) => {
          if (response.ok) {
            return response.json();
          } else {
            throw new Error("Failed to add part");
          }
        })
        .then(() => {
          this.fetchCarDetails();
          this.resetAddPartForm();
        })
        .catch((error) => {
          console.error("Failed to add part:", error);
        });
    },
    openEditPartDialog(part) {
      this.editPart = { ...part };
      this.isEditPartDialogOpen = true;
    },
    resetEditPartForm() {
      this.isEditPartDialogOpen = false;
      this.editPart = {
        id: "",
        name: "",
        serial_number: "",
      };
    },
    updatePart() {
      const partId = this.editPart.id;
      const updatedPart = {
        name: this.editPart.name,
        serial_number: this.editPart.serial_number,
      };

      fetch(`http://127.0.0.1:8000/api/parts/${partId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedPart),
      })
        .then((response) => {
          if (response.ok) {
            return response.json();
          } else {
            throw new Error("Failed to update part");
          }
        })
        .then(() => {
          this.fetchCarDetails();
          this.resetEditPartForm();
        })
        .catch((error) => {
          console.error("Failed to update part:", error);
        });
    },
    deletePart(part) {
      if (confirm(`Are you sure you want to delete the part ${part.name}?`)) {
        fetch(`http://127.0.0.1:8000/api/parts/${part.id}`, {
          method: "DELETE",
        })
          .then((response) => {
            if (response.ok) {
              this.fetchCarDetails();
            } else {
              throw new Error("Failed to delete part");
            }
          })
          .catch((error) => {
            console.error("Failed to delete part:", error);
          });
      }
    },
  },
};
</script>

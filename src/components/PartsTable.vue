<template>
  <div>
    <h3>Parts</h3>
    <table class="table table-striped">
      <thead>
        <tr>
          <th>Name</th>
          <th>Serial Number</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="part in parts" :key="part.id">
          <td>{{ part.name }}</td>
          <td>{{ part.serial_number }}</td>
          <td>
            <button @click="editPart(part)" class="btn btn-warning mx-1">
              <i class="fas fa-edit"></i> Edit
            </button>
            <button @click="deletePart(part)" class="btn btn-danger mx-1">
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
    parts: Array,
  },
  methods: {
    editPart(part) {
      // Emit an event to notify the parent component
      this.$emit("edit-part", part);
    },
    deletePart(part) {
      // Emit an event to notify the parent component
      this.$emit("delete-part", part);
    },
  },
};
</script>

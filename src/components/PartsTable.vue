<template>
  <div>
    <h3>Parts</h3>
    <table class="table table-striped">
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Serial Number</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="part in parts" :key="part.id">
          <td>{{ part.id }}</td>
          <td>{{ part.name }}</td>
          <td>{{ part.serial_number }}</td>
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
};
</script>

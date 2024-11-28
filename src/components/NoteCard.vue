<script setup>
defineProps(["note"]);
</script>
<template>
  <div class="note-card">
    <h3>{{ note.title }}</h3>
    <p>{{ note.content }}</p>
  </div>
</template>
<style>
.note-card {
  margin: 5px;
  border: 1px solid grey;
  border-radius: 10px;
  padding: 10px;
}
</style>

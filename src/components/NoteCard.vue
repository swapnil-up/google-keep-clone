<script setup>
defineProps({
  note:{
    type:Object,
    required:true,
  },
});
</script>
<template>
    <div class="note-card">
      <div class="drag-handle">::</div>
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
.drag-handle {
  margin-bottom: 5px;
  font-size: 18px;
}
</style>

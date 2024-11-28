<script setup>
defineProps({
  note: {
    type: Object,
    required: true,
  },
});
const emit = defineEmits(["click"]);

const handleClick = () => {
  emit("click", props.note);
};
</script>
<template>
  <div class="note-card">
    <div class="drag-handle">
      <h3>{{ note.title }}</h3>
      <p>{{ note.content }}</p>
    </div>
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

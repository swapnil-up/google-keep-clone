<script setup>
const props = defineProps({
  isOpen: {
    type: Boolean,
    required: true,
  },
});
</script>

<template>
  <div id="modal-unique">
    <div v-if="isOpen" class="modal-overlay">
      <div class="model-content">
        <h1>New Modal</h1>
        <p>This is a paraaaaaaaaaaaaa</p>
      </div>
    </div>
    <button @click="$emit('update:isOpen', false)">close Modal</button>
  </div>
</template>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-content {
  background-color: white;
  padding: 20px;
  border-radius: 5px;
  max-width: 400px;
  text-align: center;
}
</style>

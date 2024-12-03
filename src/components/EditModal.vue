<script setup>
import { ref, defineEmits, onMounted } from "vue";
import { watch } from "vue";

const emit = defineEmits(["update:isOpen", "close"]);

const props = defineProps({
  isOpen: {
    type: Boolean,
    required: true,
  },
  note: {
    type: Object,
    required: true,
  },
});

watch(
  () => props.isOpen,
  (newVal) => {
    console.log("isOpen prop updated to: ", newVal);
  }
);

function closeModal() {
  emit("update:isOpen", false);
  emit("close");
}

const handleKeyup = (event) => {
  if (event.key === "Escape") {
    closeModal();
  }
};

onMounted(() => {
  document.addEventListener("keyup", handleKeyup);
});
</script>

<template>
  <div id="modal-unique" @keyup.esc="closeModal">
    <div v-if="isOpen" class="modal-overlay">
      <div class="modal-content">
        <h1>Edit Note</h1>
        <input v-model="note.title" @keyup.esc="closeModal" />
        <br />
        <input v-model="note.content" @keyup.esc="closeModal" />
        <br />
        <button @click.stop="closeModal">Close</button>
      </div>
    </div>
  </div>
</template>

<style>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-content {
  background-color: #fff;
  padding: 30px;
  border-radius: 10px;
  max-width: 500px;
  width: 100%;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
  color: #333;
  text-align: left;
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.modal-content h1 {
  font-size: 1.5rem;
  color: #333;
  margin-bottom: 10px;
  text-align: center;
}

.modal-content input {
  width: 100%;
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #ccc;
  font-size: 1rem;
  margin-bottom: 15px;
  transition: border-color 0.3s ease-in-out;
}

.modal-content input:focus {
  outline: none;
  border-color: #007bff;
}

.modal-content button {
  background-color: #007bff;
  color: #fff;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1rem;
  align-self: flex-end;
  transition: background-color 0.3s ease-in-out;
}

.modal-content button:hover {
  background-color: #0056b3;
}
</style>

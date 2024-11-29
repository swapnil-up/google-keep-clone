<script setup>
import { ref, defineEmits } from "vue";
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
  console.log("Closing modal...");
  emit("update:isOpen", false);
  emit("close");
}
</script>

<template>
  <div id="modal-unique">
    <div v-if="isOpen" class="modal-overlay">
      <div class="modal-content">
        <h1>Edit Note</h1>
        <input v-model="note.title" />
        <br />
        <input v-model="note.content" />
        <br />
        <button @click.stop="closeModal">Close Modal</button>
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
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-content {
  color: aqua;
  padding: 20px;
  border-radius: 5px;
  max-width: 400px;
  text-align: center;
  text-decoration-color: rebeccapurple;
}
</style>

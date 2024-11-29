<script setup>
import { ref } from "vue";
import EditModal from "./EditModal.vue";

defineProps({
  note: {
    type: Object,
    required: true,
  },
});

const emit = defineEmits(["click"]);

const showModal = ref(false);
const modalData = ref(null);

function editCard(note) {
  showModal.value = true;
  modalData.value = note;
}
function closeModal() {
  showModal.value = false;
}
</script>
<template>
  <div class="note-card" @click="editCard(note)">
    <div class="drag-handle">
      <h3>{{ note.title }}</h3>
      <p>{{ note.content }}</p>
      <div class="tags">
        <span v-for="tag in note.tags" :key="tags" class="tag-button">
          {{ tag }}
        </span>
      </div>

      <div class="modal-div">
        <EditModal
          :isOpen="showModal"
          @update:isOpen="showModal = $event"
          :note="modalData"
          @close="closeModal"
        ></EditModal>
      </div>
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
.tag-button {
  background-color: gray;
  padding: 5px;
  margin: 5px;
  border-radius: 15px;
  font-size: medium;
}
</style>

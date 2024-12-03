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

const removeTag = (note, index) => {
  note.tags.splice(index, 1);
};
</script>
<template>
  <div class="note-card" @click="editCard(note)">
    <div class="drag-handle">
      <h3>{{ note.title }}</h3>
      <p>{{ note.content }}</p>
      <div class="tags">
        <span v-for="(tag, index) in note.tags" :key="index" class="tag-button">
          {{ tag }}
          <button @click.stop="removeTag(note, index)" class="delete-tag">
            x
          </button>
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
  max-width: 25ch;
}
.drag-handle {
  margin-bottom: 5px;
  font-size: 18px;
}
.tag-button {
  background-color: #cfcfcf;
  padding: 5px;
  margin-top: 15px;
  margin: 5px;
  border-radius: 15px;
  font-size: medium;
}
.delete-tag {
  border: none;
  background: none;
  color: white;
  cursor: pointer;
  font-size: 14px;
}
</style>

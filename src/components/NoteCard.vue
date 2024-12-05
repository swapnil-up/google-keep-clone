<script setup>
import { ref, watch } from "vue";
import EditModal from "./EditModal.vue";

defineProps({
  note: {
    type: Object,
    required: true,
  },
});

const showModal = ref(false);
const modalData = ref(null);

function editCard(note) {
  if (note) {
    showModal.value = true;
    modalData.value = note;
  }
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
      <div v-if="note.additionalProperties?.image">
        <img :src="note.additionalProperties.image" />
      </div>
      <div class="tags">
        <span
          v-for="(tag, index) in note.tags"
          :key="note.id"
          class="tag-button"
        >
          {{ tag }}
          <button @click.stop="removeTag(note, index)" class="delete-tag">
            x
          </button>
        </span>
      </div>

      <div class="modal-div">
        <EditModal
          v-if="modalData"
          :isOpen="showModal"
          @update:isOpen="showModal = $event"
          :note="modalData"
          @close="closeModal"
        ></EditModal>
      </div>
    </div>
  </div>
</template>
<style scoped>
.note-card {
  margin: 5px;
  border: 1px solid grey;
  border-radius: 10px;
  padding: 10px;
  max-width: 25ch;
  height: fit-content;
  break-inside: avoid;
}
.note-card:hover {
  background-color: #cfcfcf;
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

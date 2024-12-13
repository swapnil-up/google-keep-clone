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
const emit = defineEmits(["delete-note"]);
const deleteNote = (note) => {
  emit("delete-note", note);
};
</script>

<template>
  <div class="note-card" @click="editCard(note)">
    <div class="drag-handle">
      <div class="top-line">
        <h3>{{ note.title }}</h3>
        <button @click.stop="deleteNote(note)" class="delete-note">x</button>
      </div>
      <p>{{ note.content }}</p>
      <div
        v-if="
          note.additional_properties && note.additional_properties.image_url
        "
      >
        <img
          :src="`http://localhost:8000` + note.additional_properties.image_url"
        />
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
        <div class="button-list">
          <button>XX</button>
          <button>XX</button>
          <button>XX</button>
          <button>XX</button>
        </div>
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
  box-shadow: gray 2px 2px;
}
.delete-note {
  display: none;
}
.note-card:hover .delete-note {
  display: block;
}
.button-list {
  display: none;
}
.note-card:hover .button-list {
  margin-top: 15px;
  display: flex;
  gap: 15px;
}
button:hover {
  background-color: rgb(185, 185, 185);
  border-radius: 10px;
  padding-left: 4px;
  padding-right: 4px;
}
.drag-handle {
  margin-bottom: 5px;
  font-size: 18px;
}
.top-line {
  display: flex;
  justify-content: space-between;
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
  display: none;
  border: none;
  background: none;
  color: white;
  cursor: pointer;
  font-size: 14px;
}
.tag-button:hover .delete-tag {
  display: inline;
}
</style>

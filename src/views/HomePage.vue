<script setup>
import { ref, watch, computed } from "vue";
import draggable from "vuedraggable";
import NoteCard from "../components/NoteCard.vue";
import AddNoteCard from "../components/AddNoteCard.vue";
import { useStore } from "vuex";
const store = useStore();
const count = computed(() => store.state.notesCount);

const { notes, filteredNotes } = defineProps({
  notes: { type: Array, Required: true },
  filteredNotes: {
    type: Array,
    Required: true,
  },
});

const emit = defineEmits(["update-notes"]);

function handleAddNote(newNote) {
  const updatedNotes = [...notes, newNote];
  emit("update-notes", updatedNotes);
}

function updateFilteredNotes(newFilteredNotes) {
  console.log("Filtered Notes:", newFilteredNotes);
  emit("update-notes", newFilteredNotes);
}
</script>

<template>
  <div class="main-content">
    <AddNoteCard @add-note="handleAddNote" :notes="notes" />
    <h3>New Notes Added: {{ count }}</h3>
    <div class="notes-area">
      <draggable
        v-bind:model-value="filteredNotes"
        @update:model-value="updateFilteredNotes($event)"
        handle=".drag-handle"
        class="single-note"
        item-key="id"
      >
        <template #item="{ element }">
          <NoteCard :note="element" />
        </template>
      </draggable>
    </div>
  </div>
</template>

<style scoped>
.main-content {
  display: flex;
  flex-direction: column;
  margin-right: 5%;
}
.notes-area {
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  gap: 16px;
  padding: 10px;
}
.single-note {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}
.drag-handle {
  cursor: grab;
}
.modal-div {
  background-color: white;
}
</style>

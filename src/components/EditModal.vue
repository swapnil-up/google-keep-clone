<script setup>
import { ref, defineEmits, onMounted } from "vue";
import { watch } from "vue";
import apiClient from "../api/axios";

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

async function saveModal(note) {
  const response = await apiClient.patch(`/notes/${note.id}`, {
    title: note.title,
    content: note.content,
  });
  if (response.data.message === "updated") {
    closeModal();
  }
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
    <div
      v-if="isOpen"
      class="fixed top-0 left-0 w-full h-full flex justify-center items-center z-50 bg-black bg-opacity-75"
    >
      <div
        class="bg-white p-4 rounded-3xl m-4 max-w-xl w-full text-center flex flex-col gap-1"
      >
        <h1 class="text-2xl mb-3 text-center">Edit Note</h1>
        <input
          class="w-full p-2 border border-gray-400 text-base mb-3 transition-colors duration-1000 ease-in-out focus:outline-none focus:border-teal-400 focus:ring-2 focus:ring-teal-400"
          v-model="note.title"
          @keyup.esc="closeModal"
        />
        <br />
        <input
          class="w-full p-2 border border-gray-400 text-base mb-3 transition-colors duration-1000 ease-in-out focus:outline-none focus:border-teal-400 focus:ring-2 focus:ring-teal-400"
          v-model="note.content"
          @keyup.esc="closeModal"
        />
        <br />
        <div class="flex flex-row justify-around gap-2">
          <button
            class="bg-cyan-600 text-white text-lg py-1 px-5 rounded-lg cursor-pointer transition-colors duration-500 ease-in hover:bg-cyan-900"
            @click.stop="saveModal(note)"
          >
            Save
          </button>
          <button
            class="bg-cyan-600 text-white text-lg py-1 px-5 rounded-lg cursor-pointer transition-colors duration-500 ease-in hover:bg-cyan-900"
            @click.stop="closeModal"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

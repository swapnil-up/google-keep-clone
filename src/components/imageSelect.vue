<script setup>
import { ref } from "vue";

const imageUrl = ref(null);
const fileInput = ref(null);

const emit = defineEmits(["image-selected"]);

const openFileDialog = () => {
  fileInput.value.click();
};
const handleFileChange = (event) => {
  const file = event.target.files[0];
  if (file) {
    // emit("image-selected", file);
    imageUrl.value = URL.createObjectURL(file);
    emit("image-selected", file);
  }
};
</script>

<template>
  <button
    class="border border-gray-300 rounded-lg w-10/12 hover:bg-gray-300 transition-colors duration-300"
    @click="openFileDialog"
  >
    Choose image
  </button>
  <input
    type="file"
    ref="fileInput"
    accept="image/*"
    style="display: none"
    @change="handleFileChange"
  />
  <div v-if="imageUrl">
    <h2 class="mt-2">Selected image is:</h2>
    <img class="w-52 h-52 mt-2" :src="imageUrl" />
  </div>
</template>

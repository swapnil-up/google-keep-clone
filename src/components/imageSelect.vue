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
    // imageUrl.value = URL.createObjectURL(file);
    emit("image-selected", file);
  }
};
</script>

<template>
  <button @click="openFileDialog">Choose image</button>
  <input
    type="file"
    ref="fileInput"
    accept="image/*"
    style="display: none"
    @change="handleFileChange"
  />
  <div v-if="imageUrl">
    <h2>image is:</h2>
    <img :src="imageUrl" />
  </div>
</template>
<style scoped>
button {
  border-radius: 15px;
}
img {
  width: 200px;
  height: 200px;
}
</style>

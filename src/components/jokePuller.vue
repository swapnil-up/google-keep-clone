<script setup>
import { ref } from "vue";

const joke = ref({ setup: "", punchline: "" });
const showPunchline = ref(false);
function togglePunchline() {
  showPunchline.value = !showPunchline.value;
}

function callJoke() {
  let isLoading = true;
  fetch("https://official-joke-api.appspot.com/random_joke")
    .then((response) => {
      if (!response.ok) {
        if (response.status === 404) {
          throw new Error("content not found");
        } else if (response.status === 500) {
          throw new Error("server error");
        } else {
          throw new Error("HTTP error: ${response.code}");
        }
      }

      return response.json();
    })
    .then((data) => {
      console.log(data);
      joke.value.setup = data.setup;
      joke.value.punchline = data.punchline;
      showPunchline.value = false;
    })
    .catch((error) => {
      console.log("Error:", error);
      isLoading = false;
    })
    .finally(() => {
      isLoading = false;
    });
}
</script>

<template>
  <div
    class="m-4 border border-gray-400 p-4 max-w-[25ch] rounded-lg hover:cursor-pointer hover:bg-gray-200"
    @click="callJoke"
  >
    <p v-if="!joke.setup">Everyone deserves a laugh. Click to get your due</p>
    <p v-if="joke.setup">{{ joke.setup }}</p>
    <button
      class="w-full hover:bg-red-500 hover:text-white"
      v-if="!showPunchline && joke.setup"
      @click.stop="togglePunchline"
    >
      Answer
    </button>
    <p v-if="joke.punchline && showPunchline">{{ joke.punchline }}</p>
  </div>
</template>

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
  <div class="joke-card" @click="callJoke">
    <p v-if="!joke.setup">Everyone deserves a laugh. Click to get your due</p>
    <p v-if="joke.setup">{{ joke.setup }}</p>
    <button
      class="show-answer"
      v-if="!showPunchline && joke.setup"
      @click.stop="togglePunchline"
    >
      Answer
    </button>
    <p v-if="joke.punchline && showPunchline">{{ joke.punchline }}</p>
  </div>
</template>

<style scoped>
.joke-card {
  margin: 15px;
  border: 1px solid gray;
  padding: 15px;
  max-width: 25ch;
  border-radius: 15px;
}
.joke-card:hover {
  cursor: pointer;
  background-color: rgb(228, 228, 228);
}
.show-answer {
  width: 100%;
}
.show-answer:hover {
  background-color: rgb(200, 0, 0);
  color: aliceblue;
}
</style>

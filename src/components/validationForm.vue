<script setup>
import { onMounted, ref, computed } from "vue";

const username = ref("");
const isValidUsername = computed(() => username.value.trim() !== "");

const email = ref("");
const emailRegex =
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,24}))$/;
const isValidEmail = computed(() => emailRegex.test(email.value));

const password = ref("");
const passwordRegex =
  /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
const isValidPassword = computed(() => passwordRegex.test(password.value));

const passwordRe = ref("");
const isSamePassword = computed(() => password.value === passwordRe.value);

const options = ["sports", "entertainment", "politics", "international"];
const selectedOptions = ref([]);
const validateCheckboxes = computed(() => {
  const count = selectedOptions.value.length;
  if (count === 2) {
    return true;
  } else {
    return false;
  }
});

const images = ref([]);

const validateImages = computed(() => images.value.length === 2);

const imageCount = (event) => {
  images.value = Array.from(event.target.files);
  console.log(images.value);
};

function handleSubmit() {
  if (isValidUsername.value) {
    alert("Form submitted");
  } else {
    alert("fill username");
  }
}
</script>

<template>
  <div>
    <form @submit.prevent="handleSubmit" class="form">
      <div class="form-item">
        <label for="name" class="input-wrapper">Name</label>
        <div class="input-area">
          <span v-if="!isValidUsername" class="error-message"
            >Username required</span
          >
          <input placeholder="enter name" v-model="username" type="text" />
        </div>
      </div>
      <div class="form-item">
        <label for="Email" class="input-wrapper">Email</label>
        <div class="input-area">
          <span v-if="!isValidEmail" class="error-message"
            >Email must be valid</span
          >
          <input placeholder="enter email" v-model="email" type="text" />
        </div>
      </div>
      <div class="form-item">
        <label for="Password" class="input-wrapper">Password</label>
        <div class="input-area">
          <span v-if="!isValidPassword" class="error-message"
            >Password must be valid</span
          >
          <input placeholder="enter password" v-model="password" type="text" />
        </div>
      </div>
      <div class="form-item">
        <label for="Password" class="input-wrapper">Password Again</label>
        <div class="input-area">
          <span v-if="!isSamePassword" class="error-message"
            >Password must be same as above</span
          >
          <input
            placeholder="enter password again"
            v-model="passwordRe"
            type="text"
          />
        </div>
      </div>

      <div class="form-item">
        <label for="Checkboxes" class="input-wrapper">Checkboxes</label>
        <div class="input-area">
          <span v-if="!validateCheckboxes" class="error-message"
            >Choose exactly two</span
          >
          <div v-for="(option, index) in options" :key="index">
            <input
              placeholder="enter password again"
              v-model="selectedOptions"
              :id="option"
              :value="option"
              type="checkbox"
            />
            <label :for="option">{{ option }}</label>
          </div>
        </div>
      </div>

      <div class="form-item">
        <label for="Images" class="input-wrapper">Images</label>
        <div class="input-area">
          <span v-if="!validateImages" class="error-message"
            >Upload exactly two images</span
          >
          <input
            type="file"
            multiple
            accept=".png, .jpg, .jpeg "
            @change="imageCount"
          />
        </div>
      </div>

      <button
        type="submit"
        :disabled="
          !isValidUsername ||
          !isValidEmail ||
          !isValidPassword ||
          !isSamePassword
        "
      >
        Submit
      </button>
    </form>
  </div>
</template>

<style scoped>
button {
  border: 1px solid gray;
  margin: 5px;
  max-width: 500px;
}
button:hover:disabled {
  cursor: not-allowed;
}

.error-message {
  color: red;
  font-size: 12px;
  margin-top: 4px;
}

.form {
  display: flex;
  flex-direction: column;
}

.form-item {
  display: flex;
  flex-direction: row;
  align-items: flex-end;
  padding: 5px;
}

.input-area {
  display: flex;
  flex-direction: column;
  margin-left: 15px;
}
</style>

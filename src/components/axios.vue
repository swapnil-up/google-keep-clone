<script setup>
import { onMounted, ref } from "vue";
import axios from "axios";

const apiClient = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com/",
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
  },
});

const user = ref(null);
const userId = ref(null);
const loading = ref(false);
const error = ref(null);

const fetchUser = async () => {
  if (!userId) {
    loading.value = false;
    error.value = "failed to fetch";
    user.value = null;
    console.log("failed");
  }
  try {
    loading.value = true;
    error.value = false;

    const response = await axios.get(
      `https://jsonplaceholder.typicode.com/users/${userId.value}`
    );

    user.value = response.data;
    console.log(user.value);
  } catch (e) {
    loading.value = false;
    error.value = "failed to fetch";
    user.value = null;
    console.log("failed", e);
  } finally {
    loading.value = false;
  }
};

const newUser = ref({
  name: "",
  email: "",
  phone: "",
  website: "",
});

const createUser = async () => {
  axios
    .post(`https://jsonplaceholder.typicode.com/users/`, newUser.value)
    .then((response) => {
      console.log("created a new user");
      console.log(newUser.value);
      console.log(response);

      newUser.value = { name: "", email: "", phone: "", website: "" };
    })
    .catch((e) => {
      console.log("failed to create user", e);
    });
};

const isEdit = ref(false);
function toggleEdit() {
  isEdit.value = !isEdit.value;
}

const updateUser = async () => {
  try {
    const response = await axios.put(
      `https://jsonplaceholder.typicode.com/users/${userId.value}/`,
      user.value
    );
    console.log("edited user");
    console.log(user.value);
    user.value = { id: "", name: "", email: "", phone: "", website: "" };
  } catch (e) {
    console.log("failed to edit user", e);
  } finally {
    toggleEdit();
  }
};

const deleteUser = async () => {
  try {
    apiClient.delete(`users/${userId.value}`);
    console.log(`deleted user ${userId.value}`);
    user.value = null;
  } catch (e) {
    console.log("couldn't delete", e);
  }
};

const userIds = ref("");
const users = ref([]);

const fetchUsers = async () => {
  const ids = userIds.value.split(",").map((id) => id.trim());
  try {
    const responses = await Promise.all(
      ids.map((id) =>
        axios.get(`https://jsonplaceholder.typicode.com/users/${id}`)
      )
    );
    users.value = responses.map((response) => response.data);
    console.log(users.value);
  } catch {
    console.log("Error fetching users", error);
  }
};

const page = ref(4);
const limit = ref(3);

const fetchUserP = async () => {
  try {
    const response = await apiClient.get(
      `users?_page=${page.value}&_limit=${limit.value}`
    );
    users.value = response.data;
    console.log(users.value);
  } catch {
    if (error.response) {
      console.log("Error response:", error.response);
    } else if (error.request) {
      console.log("Error request:", error.request);
    } else {
      console.log("Error message:", error.message);
    }
  }
};

async function fetchViaParams() {
  try {
    const response = await apiClient.get(`/users/`, {
      params: {
        name: "Clementine Bauch",
        // username: "Samantha",
        // website: "ramiro.info",
        //  this doesn't work because key value pair ma kaam
        // garxam, not nested objects:
        // company: {
        //   name: "Romaguera-Jacobson",
        //   catchPhrase: "Face to face bifurcated interface",
        //   bs: "e-enable strategic applications",
        // },
      },
    });
    user.value = response.data;
    console.log(user.value);
  } catch {
    console.log("error occured");
  }
}
fetchViaParams();
</script>

<template>
  <h3>Fetch pages with limit</h3>
  <input placeholder="enter page number" v-model="page" />
  <input placeholder="enter limit" v-model="limit" />
  <button class="btn" @click="fetchUserP">get the limited data?</button>
  <div v-if="users.length > 0">
    <li v-for="user in users" :key="user.id" class="border border-gray-400 m-3">
      <p>Name: {{ user.name }}</p>
      <p>Email: {{ user.email }}</p>
      <p>Website: {{ user.website }}</p>
      <p>Phone: {{ user.phone }}</p>
    </li>
  </div>

  <h3>Fetch multiple users</h3>
  <input v-model="userIds" placeholder="enter comma separated value" />
  <button class="btn" @click="fetchUsers">get the users?</button>

  <div v-if="users.length > 0">
    <li v-for="user in users" :key="user.id" class="multi-user">
      <p>Name: {{ user.name }}</p>
      <p>Email: {{ user.email }}</p>
      <p>Website: {{ user.website }}</p>
      <p>Phone: {{ user.phone }}</p>
    </li>
  </div>

  <h3>Get a user</h3>
  <input placeholder="enter a user id" v-model.number="userId" type="number" />
  <div class="flex">
    <button class="btn" @click="fetchUser">load the user</button>
    <button class="btn" @click="deleteUser">delete the user</button>
  </div>

  <div v-if="loading">Loading</div>
  <div v-else-if="error">{{ error }}</div>
  <div v-else-if="user && !isEdit" class="flex flex-col">
    <p>Name: {{ user.name }}</p>
    <p>Email: {{ user.email }}</p>
    <p>Website: {{ user.website }}</p>
    <p>Phone: {{ user.phone }}</p>

    <button class="btn" @click="toggleEdit">edit the user</button>
  </div>

  <div v-else-if="user && isEdit">
    <h3>Edit User</h3>
    <form @submit.prevent="updateUser">
      <input v-model="user.name" placeholder="Name" required />
      <input v-model="user.email" placeholder="Email" required />
      <input v-model="user.phone" placeholder="Phone" required />
      <input v-model="user.website" placeholder="Website" required />
      <button class="btn" @click="toggleEdit" type="submit">Update User</button>
      <button class="btn" @click="toggleEdit">Cancel</button>
    </form>
  </div>

  <div class="create-user">
    <h3>Add User</h3>
    <form @submit.prevent="createUser" class="flex flex-col">
      <input v-model="newUser.name" placeholder="Name" required />
      <input v-model="newUser.email" placeholder="Email" required />
      <input v-model="newUser.phone" placeholder="Phone" required />
      <input v-model="newUser.website" placeholder="Website" required />
      <button class="btn" type="submit">Add User</button>
    </form>
  </div>
</template>

<style scoped>
.btn {
  @apply border border-gray-500 rounded-md m-1 hover:bg-gray-200;
}

input {
  @apply border border-gray-200 m-1;
  outline: none;
}

input:invalid {
  @apply border-red-400 m-1;
  outline: none;
}
</style>

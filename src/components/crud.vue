<script setup>
import { ref, computed } from "vue";

const posts = ref([]);
const newPost = ref({ title: "", body: "", userId: 1 });

const reversedPosts = computed(() => {
  return [...posts.value].reverse();
});

function getPost() {
  fetch(`https://jsonplaceholder.typicode.com/posts/`)
    .then((response) => response.json())
    .then((data) => {
      posts.value = data.map((post) => ({ ...post, isEditing: false }));
      console.log(posts.value);
    })
    .catch((error) => console.error("error is: ", error));
}

function createPost() {
  fetch("https://jsonplaceholder.typicode.com/posts", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newPost.value),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("posts created", data);
      posts.value.push(data);
    })
    .catch((error) => console.error("error is: ", error));
}

function updatePost(post) {
  fetch(`https://jsonplaceholder.typicode.com/posts/${post.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title: post.title,
      body: post.body,
      userId: 1,
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("Updated post:", data);
    })
    .catch((error) => {
      console.error("error is: ", error);
    });
}

function deletePost(id) {
  fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
    method: "DELETE",
  })
    .then((response) => response.json())
    .then(() => {
      const index = posts.value.findIndex((post) => post.id === id);
      if (index !== -1) {
        posts.value.splice(index, 1);
      }
    })
    .catch((error) => console.error("error is: ", error));
}

function saveButton(post) {
  updatePost(post);
  post.isEditing = false;
}

let currentPage = 2;
let totalPages = 5;

function fetchContent(page) {
  fetch(`https://jsonplaceholder.typicode.com/posts?_page=${page}`)
    .then((response) => response.json())
    .then((data) => {
      console.log("Data for page", data);
      if (page < totalPages) {
        console.log(`fetching next page: ${page + 1}`);
        fetchContent(page + 1);
      } else {
        console.log("no more pages left");
      }
    })
    .catch((error) => {
      console.log("error received: ", error);
    });
}

fetchContent(currentPage);

let query = "^q";
function getQuery() {
  fetch(`https://jsonplaceholder.typicode.com/posts?title_like=${query}`)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
    })
    .catch((error) => console.error("error is: ", error));
}

getQuery(query);

let url = "https://jsonplaceholder.typicode."; //deliberate wrong url
let retries = 3;

function fetchWithRetry(url, retries) {
  return fetch(url).catch((error) => {
    if (retries > 0) {
      console.log(`retrying ${retries} times`);
      return fetchWithRetry(url, retries - 1);
    }
    throw error;
  });
}

fetchWithRetry(url, retries);
</script>

<template>
  <div class="create-post">
    <h3>Create a post!</h3>
    <input v-model="newPost.title" placeholder="title" />
    <input v-model="newPost.body" placeholder="content" />
    <button @click="createPost">Create Post</button>
  </div>

  <button @click="getPost">Get posts</button>

  <div v-if="posts.length">
    <div class="post-area">
      <li v-for="post in reversedPosts" :key="post.id" class="post-item">
        <template v-if="post.isEditing">
          <textarea v-model="post.title"></textarea>
          <textarea
            :rows="post.body.length / 25"
            v-model="post.body"
          ></textarea>
          <button @click="saveButton(post)">Save</button>
          <button @click="deletePost(post.id)">Delete</button>
        </template>
        <template v-else>
          <p>{{ post.title }}</p>
          <hr />
          <p>{{ post.body }}</p>
          <button @click="post.isEditing = true">Edit</button>
          <button @click="deletePost(post.id)">Delete</button>
        </template>
      </li>
    </div>
  </div>
</template>
<style scoped>
button {
  border: 1px solid gray;
  margin: 5px;
  max-width: 500px;
}
input {
  border: 1px solid gray;
  margin: 5px;
}
.create-post {
  border: 1px solid gray;
  border-radius: 10px;
  margin: 15px;
  padding: 15px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  max-width: 500px;
}
.post-area {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}
li {
  list-style-type: none;
}
.post-item {
  border: 1px solid gray;
  border-radius: 10px;
  margin: 15px;
  padding: 15px;
  width: 25ch;
  overflow: scroll;
}
</style>

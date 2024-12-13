<script setup>
import { useStore } from "vuex";
import { useRouter } from "vue-router";
let timeoutId;

const store = useStore();
const router = useRouter();

const logout = () => {
  store.commit("logout");
  router.push({ name: "login" });
};

function resetTime() {
  clearTimeout(timeoutId);
  timeoutId = setTimeout(logout, 1000 * 12000);
}

function initializeTimeout() {
  document.addEventListener("scroll", resetTime);

  resetTime();
}

initializeTimeout();
</script>

import { ref } from "vue";

const isToggled = ref(false);

export function useSidebar() {
  const toggleMenu = () => {
    isToggled.value = !isToggled.value;
  };

  return { isToggled, toggleMenu };
}

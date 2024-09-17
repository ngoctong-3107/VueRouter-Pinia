import { defineStore } from "pinia";
import { computed, ref } from "vue";
import { useCartStore } from "./cart";

export const useAuthStore = defineStore("auth", () => {
  const isAuthenticated = ref(
    localStorage.getItem("auth")
      ? JSON.parse(localStorage.getItem("auth")).isAuthenticate
      : false
  );
  const user = ref(
    localStorage.getItem("auth")
      ? JSON.parse(localStorage.getItem("auth")).user
      : {}
  );

  const fullName = computed(() => {
    return `${user.value.first_name} ${user.value.last_name}`;
  });

  const login = async () => {
    const userId = Math.floor(Math.random() * 10 + 5);
    const response = await fetch(`https://reqres.in/api/users/${userId}`);
    const { data } = await response.json();
    user.value = data;
    isAuthenticated.value = true;
    saveToLocal();
  };

  const logout = () => {
    const cartStore = useCartStore();
    user.value = {};
    isAuthenticated.value = false;
    cartStore.clearAllItems();
    saveToLocal();
  };

  const saveToLocal = () => {
    localStorage.setItem(
      "auth",
      JSON.stringify({
        isAuthenticate: isAuthenticated.value,
        user: user.value,
      })
    );
  };

  return { isAuthenticated, user, fullName, login, logout, saveToLocal };
});

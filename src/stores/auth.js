import { defineStore } from "pinia";
import { useCartStore } from "./cart";

export const useAuthStore = defineStore({
  id: "auth",
  state: () => ({
    isAuthenticated: localStorage.getItem("auth")
      ? JSON.parse(localStorage.getItem("auth")).isAuthenticate
      : false,
    user: localStorage.getItem("auth")
      ? JSON.parse(localStorage.getItem("auth")).user
      : {},
  }),
  getters: {
    fullName: (state) => `${state.user.first_name} ${state.user.last_name}`,
  },
  actions: {
    async login() {
      const userId = Math.floor(Math.random() * 10 + 5);
      const response = await fetch(`https://reqres.in/api/users/${userId}`);
      const { data } = await response.json();
      this.user = data;
      this.isAuthenticated = true;
      this.saveToLocal();
      // console.log(localStorage.getItem("auth"));
    },

    logout() {
      const cartStore = useCartStore();
      this.user = {};
      this.isAuthenticated = false;
      cartStore.clearAllItems();
      this.saveToLocal();
    },

    saveToLocal() {
      localStorage.setItem(
        "auth",
        JSON.stringify({
          isAuthenticate: this.isAuthenticated,
          user: this.user,
        })
      );
    },
  },
});

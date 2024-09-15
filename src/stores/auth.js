import { defineStore } from "pinia";
export const useAuthStore = defineStore({
  id: "auth",
  state: () => ({
    isAuthenticated: false,
    user: {},
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
    },

    logout() {
      this.$reset();
    },
  },
});

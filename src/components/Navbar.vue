<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <nav class="bg-neutral-700 text-white p-4 flex items-center justify-between">
    <div>
      <RouterLink
        to="/"
        :class="[
          'mr-6',
          isActiveLink('/') ? 'bg-neutral-800' : 'bg-neutral-700',
        ]"
        ><i class="pi pi-home pr-2"></i>Home</RouterLink
      >
      <RouterLink
        to="/cart"
        :class="[
          'mr-6',
          isActiveLink('/cart') ? 'bg-neutral-800' : 'bg-neutral-700',
        ]"
      >
        <i class="pi pi-cart-arrow-down pr-2"></i>Cart ({{
          cartStore.countCartItems
        }})</RouterLink
      >
    </div>
    <div class="flex items-center">
      <Avatar
        v-if="isAuthenticated"
        :image="user.avatar"
        class="mr-2"
        shape="circle"
      />
      <div class="card flex justify-center">
        <Button
          type="button"
          icon="pi pi-ellipsis-v"
          @click="toggle"
          aria-haspopup="true"
          aria-controls="overlay_menu"
        />
        <Menu ref="menu" id="overlay_menu" :model="items" :popup="true" />
      </div>
    </div>
  </nav>
</template>

<script setup>
import { useCartStore } from "@/stores/cart.js";
import { storeToRefs } from "pinia";
import Avatar from "primevue/avatar";
import Button from "primevue/button";
import Menu from "primevue/menu";
import { computed, ref } from "vue";
import { RouterLink, useRoute, useRouter } from "vue-router";
import { useAuthStore } from "../stores/auth";
const authStore = useAuthStore();
const { isAuthenticated, user } = storeToRefs(authStore);
const router = useRouter();
const menu = ref();
const items = computed(() => [
  {
    label: "Options",
    items: [
      !authStore.isAuthenticated // Kiểm tra nếu chưa đăng nhập thì hiển thị Login
        ? {
            label: "Login",
            icon: "pi pi-sign-in",
            command: () => {
              authStore.login();
            },
          }
        : null, // Nếu đã đăng nhập, không hiển thị Login
      authStore.isAuthenticated
        ? {
            label: "Profile",
            icon: "pi pi-user",
            command: () => {
              router.push("/profile");
            },
          }
        : null,
      authStore.isAuthenticated // Kiểm tra nếu đã đăng nhập thì hiển thị Logout
        ? {
            label: "Logout",
            icon: "pi pi-sign-out",
            command: () => {
              authStore.logout();
              router.push("/");
            },
          }
        : null, // Nếu chưa đăng nhập, không hiển thị Logout
    ].filter((item) => item !== null), // Lọc ra các item không phải null
  },
]);

const toggle = (event) => {
  menu.value.toggle(event);
};
const route = useRoute();
const cartStore = useCartStore();

const isActiveLink = (currentLink = "/") => {
  return currentLink === route.path;
};
</script>

<style>
nav a {
  padding: 10px;
  border-radius: 10px;
}
</style>

<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <nav class="bg-neutral-700 text-white p-2 flex items-center">
    <RouterLink
      to="/"
      :class="['mr-6', isActiveLink('/') ? 'bg-neutral-800' : 'bg-neutral-700']"
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
  </nav>
</template>

<script setup>
import { useCartStore } from "@/stores/cart.js";
import { RouterLink, useRoute } from "vue-router";
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

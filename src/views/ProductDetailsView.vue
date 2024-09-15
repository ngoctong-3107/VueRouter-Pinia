<template>
  <section class="flex items-center my-5">
    <img :src="productData.image" class="w-[300px] h-[400px] object-cover" />
    <div class="max-w-[500px] ml-10">
      <h1 class="text-2xl font-bold">{{ productData.name }}</h1>
      <p>${{ productData.price }}</p>
      <p>{{ productData.description }}</p>
      <Button
        icon="pi  pi-cart-arrow-down"
        label="Add to cart"
        @click="handleAddToCart"
      />
    </div>
  </section>
</template>

<script setup>
import { useCartStore } from "@/stores/cart.js";
import { useAuthStore } from "@/stores/auth.js";
import Button from "primevue/button";
import { useToast } from "primevue/usetoast";
import { useRoute } from "vue-router";

const toast = useToast();
const route = useRoute();
const id = route.params.id;
const cartStore = useCartStore();
const authStore = useAuthStore();
const productData = cartStore.getProductDetails(parseInt(id));
const handleAddToCart = () => {
  if (!authStore.isAuthenticated) {
    toast.add({
      severity: "warn",
      summary: "Warn message",
      detail: "Please login to add the item to your cart",
      life: 3000,
    });
    return;
  }
  cartStore.addToCart(productData);
  toast.add({
    severity: "success",
    summary: "success",
    detail: "Add item to cart",
    life: 3000,
  });
};
</script>

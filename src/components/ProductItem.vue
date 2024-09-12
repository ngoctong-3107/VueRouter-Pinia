<template>
  <Card>
    <template #header>
      <img :src="product.image" class="w-full h-[200px] object-cover" />
    </template>
    <template #title>{{ product.name }}</template>
    <template #subtitle>${{ product.price }}</template>
    <template #content>
      <p class="m-0">
        {{ product.description }}
      </p>
    </template>
    <template #footer>
      <div class="flex gap-4 mt-1">
        <Button label="View details">
          <RouterLink :to="`/product/${product.id}`">View details</RouterLink>
        </Button>
        <Button
          icon="pi  pi-cart-arrow-down"
          label="Add to cart"
          @click="handleAddToCart(product)"
        />
      </div>
    </template>
  </Card>
</template>

<script setup>
import Button from "primevue/button";
import Card from "primevue/card";
import { useToast } from "primevue/usetoast";
import { useCartStore } from "../stores/cart.js";

const toast = useToast();
defineProps({
  product: {
    type: Object,
  },
});

const cartStore = useCartStore();
const handleAddToCart = (product) => {
  cartStore.addToCart(product);
  toast.add({
    severity: "success",
    summary: "success",
    detail: "Add item to cart",
    life: 3000,
  });
};
</script>

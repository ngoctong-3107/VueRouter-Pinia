<script setup>
import ProductItem from "@/components/ProductItem.vue";
import { useCartStore } from "@/stores/cart.js";

const data = useCartStore();
</script>

<template>
  <section>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 my-4">
      <ProductItem
        v-for="product in data.products"
        :key="product.id"
        :product="product"
      />
    </div>
  </section>
</template>

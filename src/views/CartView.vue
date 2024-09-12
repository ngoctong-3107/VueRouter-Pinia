<template>
  <DataTable :value="cartStore.cartItems" tableStyle="min-width: 50rem">
    <template #header>
      <div class="flex flex-wrap items-center justify-between gap-2">
        <span class="text-xl font-bold">Cart items</span>
      </div>
    </template>
    <Column field="name" header="Name"></Column>
    <Column header="Image">
      <template #body="slotProps">
        <img
          :src="`${slotProps.data.image}`"
          :alt="slotProps.data.image"
          class="w-11 rounded"
        />
      </template>
    </Column>
    <Column header="Quantity">
      <template #body="slotProps">
        <div class="flex items-center gap-2">
          <Button
            icon="pi pi-minus"
            @click="cartStore.decreaseQuantity(slotProps.data.id)"
          />
          <span>{{ slotProps.data.quantity }}</span>
          <Button
            icon="pi pi-plus"
            @click="cartStore.increaseQuantity(slotProps.data.id)"
          />
        </div>
      </template>
    </Column>
    <Column field="price" header="Price"></Column>
    <Column header="Subtotal">
      <template #body="slotProps">
        $ {{ (slotProps.data.quantity * slotProps.data.price).toFixed(1) }}
      </template>
    </Column>
    <Column header="">
      <template #body="slotProps">
        <i
          class="pi pi-trash cursor-pointer"
          style="color: red"
          @click="handleRemove(slotProps.data.id)"
        ></i>
      </template>
    </Column>

    <template #footer>
      <div class="flex justify-between">
        <span>
          Total:
          {{ cartStore.countCartItems }} products
        </span>
        <span>Total: ${{ cartStore.totalCartItems }}</span>
      </div>
    </template>
  </DataTable>
  <Toast />
</template>

<script setup>
import { useCartStore } from "@/stores/cart.js";
import Button from "primevue/button";
import Column from "primevue/column";
import DataTable from "primevue/datatable";
import Toast from "primevue/toast";
import { useToast } from "primevue/usetoast";
const toast = useToast();
const cartStore = useCartStore();

const handleRemove = (id) => {
  cartStore.removeToCart(id);
  toast.add({
    severity: "success",
    summary: "success",
    detail: "Remove item to cart",
    life: 3000,
  });
};
</script>

<style>
.p-button-icon-only {
  width: 20px !important;
  height: 30px !important;
  background-color: #989393 !important;
  border: none !important;
  padding-left: 15px !important;
  padding-right: 15px !important;
}
</style>

<script setup>
import Toast from "primevue/toast";
import { RouterView } from "vue-router";
import Navbar from "./components/Navbar.vue";
</script>

<template>
  <header>
    <div>
      <Navbar />
    </div>
  </header>

  <main class="px-5">
    <RouterView />
  </main>
  <Toast />
</template>

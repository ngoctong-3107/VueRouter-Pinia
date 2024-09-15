<template>
  <div class="my-5 flex items-start gap-5">
    <img :src="avatar" alt="" class="rounded-md object-cover" />
    <div>
      <p>Email: {{ email }}</p>
      <p>Name: {{ fullName }}</p>
    </div>
  </div>
</template>

<script setup>
import { storeToRefs } from "pinia";
import { useAuthStore } from "../stores/auth";

const authStore = useAuthStore();
const { user, fullName } = storeToRefs(authStore);
const { avatar, email } = user.value;
</script>

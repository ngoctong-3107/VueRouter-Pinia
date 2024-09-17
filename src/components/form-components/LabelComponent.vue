<template>
  <div>
    <label v-if="label" :for="props.for" class="text-sm">{{ label }}</label>
  </div>
</template>

<script setup>
const props = defineProps({
  label: String,
  for: String,
});
</script>

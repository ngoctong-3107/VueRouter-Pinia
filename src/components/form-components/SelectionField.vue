<template>
  <div>
    <label-component :label="label" :for="name" class="font-semibold" />

    <div v-for="(val, i) in values" :key="i">
      <Field :name="name" :type="inputType" :value="val" :id="val" />
      <label-component :label="val" :for="val" class="inline pl-2" />
    </div>
    <ErrorMessage :name="name" class="text-[#ff4f4f] text-sm italic" />
  </div>
</template>

<script setup>
import { ErrorMessage, Field } from "vee-validate";
import LabelComponent from "./LabelComponent.vue";
defineProps({
  label: {
    type: [String, Boolean],
    default: false,
    require: false,
  },
  values: {
    type: Array,
    required: true,
  },
  inputType: {
    type: String,
    default: "checkbox",
  },
  name: {
    type: String,
    required: true,
  },
});
</script>

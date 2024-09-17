<template>
  <div class="flex flex-col w-full mb-2">
    <label-component :label="label" :for="name" class="font-semibold" />
    <input
      :type="inputType"
      v-bind="inputBinds"
      :id="name"
      :placeholder="placeholder"
      class="placeholder:italic placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-md py-2 pl-2 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm my-1"
    />
    <ErrorMessage :name="name" class="text-[#ff4f4f] text-sm italic" />
  </div>
</template>

<script setup>
import { ErrorMessage } from "vee-validate";
import LabelComponent from "./LabelComponent.vue";
const props = defineProps({
  label: {
    type: [String, Boolean],
    default: false,
    required: false,
  },
  inputType: {
    type: String,
    default: "text",
  },
  placeholder: {
    type: String,
    default: "",
    required: false,
  },
  name: {
    type: String,
    required: true,
  },
  defineInputBinds: {
    type: Function,
    required: true,
  },
  errorBag: {
    type: Object,
    required: true,
  },
});

const inputBinds = props.defineInputBinds(props.name);
</script>

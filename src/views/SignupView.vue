<template>
  <div>
    <h1 class="text-2xl font-bold">Sign up</h1>
    <form
      class="grid grid-cols-2 max-w-[800px] gap-5 m-auto py-4 px-6 rounded-lg border-2 shadow-md"
      @submit="submit"
    >
      <div class="flex flex-col">
        <input-field
          label="Name"
          placeholder="Your name"
          name="name"
          :defineInputBinds="defineInputBinds"
          :error-bag="errorBag"
        />
        <input-field
          label="Email"
          placeholder="Your email"
          name="email"
          :defineInputBinds="defineInputBinds"
          :error-bag="errorBag"
        />
        <selection-field
          label="Favorite category"
          :values="['Clothing', 'Home appliance', 'Food']"
          name="favoriteCategory"
        />
      </div>
      <div class="flex flex-col">
        <input-field
          label="Password"
          placeholder="Your password"
          name="password"
          :defineInputBinds="defineInputBinds"
          :error-bag="errorBag"
          inputType="password"
        />
        <input-field
          label="Confirm password"
          placeholder="Your password"
          name="confirmPassword"
          :defineInputBinds="defineInputBinds"
          :error-bag="errorBag"
          inputType="password"
        />
        <selection-field
          label="Member type"
          :values="['Buyer', 'Seller']"
          name="memberType"
          input-type="radio"
        />
      </div>
      <button class="bg-red-400 p-2 rounded-md text-white">Sign up</button>
    </form>
  </div>
</template>

<script setup>
import InputField from "@/components/form-components/InputField.vue";
import SelectionField from "@/components/form-components/SelectionField.vue";
import { useForm } from "vee-validate";
import { array, object, ref, string } from "yup";

const schema = object({
  name: string().required("Please enter your name"),
  email: string()
    .email("Please enter a valid email")
    .required("Please enter a email"),
  password: string()
    .required("Please enter a password")
    .min(6, "Password must be at least 6 characters"),
  confirmPassword: string()
    .required("Please enter a password")
    .min(6)
    .oneOf([ref("password")], "Password must match"),
  favoriteCategory: array()
    .min(1, "Please select at least one favorite category")
    .required("Please select your favorite category"),
  memberType: string().required("Please select your member type"),
});

const { defineInputBinds, errorBag, values, handleSubmit } = useForm({
  validationSchema: schema,
});
const submit = handleSubmit(() => {
  alert(JSON.stringify(values));
});
</script>

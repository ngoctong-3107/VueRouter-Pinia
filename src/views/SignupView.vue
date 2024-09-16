<template>
  <div>
    <form
      class="flex flex-col max-w-[400px] m-auto py-4 px-6 rounded-lg border-2 shadow-md"
      @submit="submit"
    >
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
      <button class="bg-red-400 p-2 rounded-md text-white">Sign up</button>
    </form>
  </div>
</template>

<script setup>
import { object, string, ref } from "yup";
import { useForm } from "vee-validate";
import InputField from "@/components/form-components/InputField.vue";

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
});

const { defineInputBinds, errorBag, values, handleSubmit } = useForm({
  validationSchema: schema,
});

const submit = handleSubmit(() => {
  alert(JSON.stringify(values));
});
</script>

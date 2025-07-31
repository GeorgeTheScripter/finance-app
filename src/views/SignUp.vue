<template>
  <div class="px-4">
    <div class="fixed w-full bg-white h-[50px] flex items-center">
      <h3 class="text-3xl">Регистрация</h3>
    </div>

    <form
      @submit.prevent
      class="flex flex-col items-center gap-3 fixed top-1/2 left-4 right-4 transform -translate-y-1/2"
    >
      <div class="absolute -top-10 text-red-600 text-center" v-if="store.error">
        {{ store.error }}
      </div>
      <Input class="w-full" v-model="email" placeholder="Логин" />
      <Input class="w-full" v-model="password" placeholder="Пароль" />

      <div
        v-if="store.loading"
        class="py-4 px-2 bg-blue-600 text-white w-full rounded-xl text-center"
      >
        Загрузка
      </div>
      <Button
        v-else
        @click="signup"
        class="py-4 px-2 bg-green-600 text-white w-full"
        >Зарегистрироваться</Button
      >
    </form>
  </div>
</template>

<script setup lang="ts">
import { useAuth } from "@/store/useAuth";
import { ref } from "vue";

const email = ref<string>("");
const password = ref<string>("");
const store = useAuth();

const signup = async () => {
  await store.signUp({
    email: email.value,
    password: password.value,
  });
};
</script>

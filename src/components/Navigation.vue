<template>
  <header
    class="py-4 px-10 fixed bottom-0 bg-gray-200 w-full rounded-tl-2xl rounded-tr-2xl"
  >
    <nav class="flex justify-between">
      <RouterLink v-for="link in links" :key="link.path" :to="link.path"
        ><img class="w-[40px]" :src="link.icon" :alt="link.path"
      /></RouterLink>
    </nav>
  </header>
</template>

<script setup lang="ts">
import { RouterLink } from "vue-router";
import { links } from "@/types/navigationTypes";
</script>

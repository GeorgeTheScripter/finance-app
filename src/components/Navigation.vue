<template>
  <header
    class="py-4 px-10 fixed z-2 bottom-0 bg-slate-300 w-full rounded-tl-2xl rounded-tr-2xl"
  >
    <nav class="flex justify-between">
      <RouterLink
        v-for="link in links"
        :key="link.path"
        :to="link.path"
        class="p-2 rounded-2xl transition duration-700 ease-in-out"
        :class="{
          'bg-gray-300': $route.path !== link.path,
          'bg-gray-100': $route.path === link.path,
        }"
        ><img class="w-[40px]" :src="link.icon" :alt="link.path"
      /></RouterLink>
    </nav>
  </header>
</template>

<script setup lang="ts">
import { RouterLink } from "vue-router";
import { links } from "@/types/navigationTypes";
</script>

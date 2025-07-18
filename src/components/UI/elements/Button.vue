<template>
  <button class="px-4 py-2 bg-gray-300 rounded-xl"><slot></slot></button>
</template>

<script setup lang="ts">
defineOptions({
  name: "Button",
});
</script>

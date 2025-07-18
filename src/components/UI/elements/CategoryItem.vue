<template>
  <div class="py-2 px-4 rounded-2xl bg-gray-300 w-fit">
    {{ title }}
  </div>
</template>

<script setup lang="ts">
defineOptions({
  name: "Category",
});

defineProps<{ title: string }>();
</script>

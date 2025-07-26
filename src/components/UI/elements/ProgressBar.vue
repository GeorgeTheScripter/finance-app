<template>
  <div class="w-full h-[10px] bg-gray-300 rounded-xl overflow-hidden">
    <div
      class="h-full bg-green-600 rounded-xl"
      :style="{ width: progressPercentage + '%' }"
    ></div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  progressPercentage: number;
}>();
</script>

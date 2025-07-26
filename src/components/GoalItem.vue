<template>
  <div class="p-4 bg-gray-200 rounded-xl flex flex-col gap-5">
    <div class="w-full h-[10px] bg-gray-300 rounded-xl overflow-hidden">
      <div class="h-full w-[50px] bg-green-600"></div>
    </div>

    <div class="flex flex-col gap-4">
      <div class="flex flex-col gap-3">
        <p class="text-3xl font-medium">
          {{ goal.currentSum }} / {{ goal.destinationSum }} ₽
        </p>

        <div class="flex flex-col gap-2">
          <p class="text-xl font-medium text-gray-500">{{ goal.title }}</p>

          <p class="text-gray-400">{{ goal.description }}</p>
        </div>
      </div>

      <Button class="bg-green-600 text-xl font-medium text-white py-3 w-full"
        >Внести</Button
      >
    </div>
  </div>
</template>

<script setup lang="ts">
import { Goal } from "@/types/transactions";

defineProps<{
  goal: Goal;
}>();
</script>

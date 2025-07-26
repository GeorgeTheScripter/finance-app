<template>
  <div
    :class="`p-4 bg-gray-200 rounded-xl flex flex-col gap-5 ${completeColor}`"
  >
    <ProgressBar :progressPercentage="progressPercentage" />

    <div class="flex flex-col gap-4">
      <div class="flex flex-col gap-3">
        <div class="flex flex-col gap-2">
          <p class="text-xl font-medium text-gray-500">{{ goal.title }}</p>
        </div>
        <p class="text-xl font-medium">
          {{ goal.currentSum }} / {{ goal.destinationSum }} ₽
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Goal } from "@/types/transactions";
import { computed } from "vue";
import ProgressBar from "./UI/elements/ProgressBar.vue";

const props = defineProps<{
  goal: Goal;
}>();

const progressPercentage = computed(() => {
  if (props.goal.destinationSum <= 0) return 0;
  const percentage = (props.goal.currentSum / props.goal.destinationSum) * 100;
  return Math.min(Math.max(percentage, 0), 100);
});

const completeColor = computed(() => {
  if (props.goal.currentSum >= props.goal.destinationSum) {
    return "bg-green-200";
  }
});
</script>

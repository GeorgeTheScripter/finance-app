<template>
  <div class="p-4 bg-gray-200 rounded-xl flex flex-col gap-5">
    <div class="w-full h-[10px] bg-gray-300 rounded-xl overflow-hidden">
      <div
        class="h-full bg-green-600"
        :style="{ width: progressPercentage + '%' }"
      ></div>
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

      <Button
        @click="addSum"
        class="bg-green-600 text-xl font-medium text-white py-3 w-full"
        >Внести</Button
      >
    </div>
  </div>
</template>

<script setup lang="ts">
import { Goal } from "@/types/transactions";
import { computed } from "vue";

const props = defineProps<{
  goal: Goal;
}>();

const emit = defineEmits<{ (e: "openAddSumForm", goal: Goal): void }>();

const addSum = () => {
  emit("openAddSumForm", props.goal);
};

const progressPercentage = computed(() => {
  if (props.goal.destinationSum <= 0) return 0;
  const percentage = (props.goal.currentSum / props.goal.destinationSum) * 100;
  return Math.min(Math.max(percentage, 0), 100);
});
</script>

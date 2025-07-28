<template>
  <div class="p-4 bg-gray-200 rounded-xl flex flex-col gap-5">
    <ProgressBar :progressPercentage="progressPercentage" />

    <div class="flex flex-col gap-4">
      <div class="flex flex-col gap-3">
        <div class="flex justify-between">
          <p class="text-3xl font-medium">
            {{ goal.currentSum }} / {{ goal.destinationSum }} ₽
          </p>

          <Button @click="editGoal" class="bg-green-600 py-1 px-2 w-fit"
            ><img class="w-[24px]" :src="SettingsIcon" alt="settings"
          /></Button>
        </div>

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
import ProgressBar from "./UI/elements/ProgressBar.vue";
import { computed } from "vue";
import SettingsIcon from "@/assets/micro-icons/settings.svg";

const props = defineProps<{
  goal: Goal;
}>();

const emit = defineEmits<{
  (e: "add", goal: Goal): void;
  (e: "edit", goal: Goal): void;
}>();

const addSum = () => {
  emit("add", props.goal);
};

const editGoal = () => {
  emit("edit", props.goal);
};

const progressPercentage = computed(() => {
  if (props.goal.destinationSum <= 0) return 0;
  const percentage = (props.goal.currentSum / props.goal.destinationSum) * 100;
  return Math.min(Math.max(percentage, 0), 100);
});
</script>

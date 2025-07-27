<template>
  <form @submit.prevent="submit" class="flex flex-col gap-3">
    <h3 class="text-xl font-medium">Зачисление в {{ goal.title }}</h3>
    <div class="flex flex-col gap-2">
      <Input
        v-model.number="amount"
        placeholder="Сумма"
        type="number"
        :max="goal.destinationSum"
      />

      <Button class="flex-1 bg-green-600 text-white text-xl py-3 w-full">
        Внести
      </Button>
    </div>
  </form>
</template>

<script setup lang="ts">
import { Goal } from "@/types/transactions";
import { ref } from "vue";

const props = defineProps<{
  goal: Goal;
}>();

const emit = defineEmits<{
  (e: "submit", goalId: number, amount: number): void;
  (e: "close"): void;
}>();

const amount = ref<number | null>(null);

const submit = () => {
  if (amount.value !== null && amount.value > 0) {
    emit("submit", props.goal.id, +amount.value);
    emit("close");
  }
};
</script>

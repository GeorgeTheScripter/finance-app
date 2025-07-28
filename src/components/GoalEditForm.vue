<template>
  <form @submit.prevent="submit" class="flex flex-col gap-6">
    <div class="flex flex-col gap-2">
      <Input v-model="inputTitle" placeholder="Название" type="string" />

      <Input
        v-model="destinationSum"
        placeholder="Целевая сумма"
        type="number"
      />
      <Input
        v-model="inputDescription"
        placeholder="Описание (не обязательно)"
      />
    </div>

    <Button class="bg-green-600 text-xl font-medium text-white py-3"
      >Обновить</Button
    >
  </form>
</template>

<script setup lang="ts">
import { Goal } from "@/types/transactions";
import { ref } from "vue";

const props = defineProps<{
  goal: Goal;
}>();

const emit = defineEmits<{
  (
    e: "submit",
    goalId: number,
    destinationSum: number,
    title: string,
    description: string
  ): void;
  (e: "close"): void;
}>();

const destinationSum = ref<number | null>(null);
const inputTitle = ref<string>("");
const inputDescription = ref<string>("");

const submit = () => {
  if (!destinationSum.value) return;

  emit(
    "submit",
    props.goal.id,
    destinationSum.value,
    inputTitle.value,
    inputDescription.value
  );

  destinationSum.value = null;
  inputTitle.value = "";
  inputDescription.value = "";

  emit("close");
};
</script>

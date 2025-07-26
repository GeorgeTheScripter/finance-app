<template>
  <form @submit.prevent class="flex flex-col gap-6">
    <div class="flex flex-col gap-2">
      <Input v-model="inputTitle" placeholder="Название" type="string" />
      <Input v-model="startSum" placeholder="Стартовая сумма" type="number" />
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

    <Button
      @click="addGoal"
      class="bg-green-600 text-xl font-medium text-white py-3"
      >Добавить</Button
    >
  </form>
</template>

<script setup lang="ts">
import { useGoalsStore } from "@/store/useGoalsStore";
import { Goal } from "@/types/transactions";
import { ref } from "vue";

const startSum = ref<number | null>();
const destinationSum = ref<number | null>();
const inputTitle = ref<string>("");
const inputDescription = ref<string>("");
const store = useGoalsStore();

const emit = defineEmits<{ (e: "close"): void }>();

const addGoal = () => {
  if (!destinationSum.value || !inputTitle.value || !startSum.value) return;

  const newGoal: Goal = {
    id: +new Date(),
    currentSum: startSum.value,
    destinationSum: destinationSum.value,
    title: inputTitle.value,
    description: inputDescription.value,
  };

  store.addGoal(newGoal);

  startSum.value = 0;
  destinationSum.value = null;
  inputTitle.value = "";
  inputDescription.value = "";

  emit("close");
};
</script>

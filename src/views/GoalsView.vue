<template>
  <div class="px-4">
    <div class="fixed w-full bg-white h-[50px] flex items-center">
      <h3 class="text-3xl">Цели</h3>
    </div>

    <div class="pt-[50px] pb-[180px] flex flex-col gap-2">
      <GoalItem
        v-for="goal in store.goals"
        :key="goal.id"
        :goal="goal"
        @openAddSumForm="openAddSumModal"
      />
    </div>

    <Button
      class="fixed z-3 bottom-[100px] right-4 left-4 py-4 bg-green-600 text-xl font-medium text-white"
      v-if="!goalForm.isVisible.value"
      @click="goalForm.open"
      >Добавить</Button
    >

    <ModalWrapper :isVisible="goalForm.isVisible.value" @close="goalForm.close">
      <GoalForm @close="goalForm.close" />
    </ModalWrapper>

    <ModalWrapper
      :isVisible="addSumForm.isVisible.value"
      @close="addSumForm.close"
    >
      <GoalAddSumForm
        v-if="selectedGoal"
        :goal="selectedGoal"
        @submit="handleAddSumSubmit"
        @close="addSumForm.close"
      />
    </ModalWrapper>
  </div>
</template>

<script setup lang="ts">
import { useModal } from "@/composables/useModal";
import { useGoalsStore } from "@/store/useGoalsStore";
import ModalWrapper from "@/components/ModalWrapper.vue";
import GoalForm from "@/components/GoalForm.vue";
import GoalAddSumForm from "@/components/GoalAddSumForm.vue";
import GoalItem from "@/components/GoalItem.vue";
import { Goal } from "@/types/transactions";
import { ref } from "vue";

const store = useGoalsStore();
const goalForm = useModal();
const addSumForm = useModal();
const selectedGoal = ref<Goal | null>(null);

const openAddSumModal = (goal: Goal) => {
  selectedGoal.value = goal;
  addSumForm.open();
};

const handleAddSumSubmit = (goalId: number, amount: number) => {
  store.addToGoal(goalId, amount);
};
</script>

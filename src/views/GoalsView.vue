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
        @add="openAddSumModal"
        @edit="openEditGoalModal"
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

    <ModalWrapper
      :isVisible="editModal.isVisible.value"
      @close="editModal.close"
    >
      <GoalEditForm
        v-if="selectedGoal"
        :goal="selectedGoal"
        @submit="handleEditGoal"
        @close="editModal.close"
      />
    </ModalWrapper>
  </div>
</template>

<script setup lang="ts">
import { useModal } from "@/composables/useModal";
import { useGoalsStore } from "@/store/useGoalsStore";
import { Goal } from "@/types/transactions";
import { onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";

import ModalWrapper from "@/components/ModalWrapper.vue";
import GoalForm from "@/components/GoalForm.vue";
import GoalAddSumForm from "@/components/GoalAddSumForm.vue";
import GoalItem from "@/components/GoalItem.vue";
import GoalEditForm from "@/components/GoalEditForm.vue";

const store = useGoalsStore();
const goalForm = useModal();
const addSumForm = useModal();
const editModal = useModal();
const selectedGoal = ref<Goal | null>(null);
const router = useRouter();
const route = useRoute();

const openAddSumModal = (goal: Goal) => {
  selectedGoal.value = goal;
  addSumForm.open();
};

const openEditGoalModal = (goal: Goal) => {
  selectedGoal.value = goal;
  editModal.open();
};

const handleAddSumSubmit = (goalId: number, amount: number) => {
  store.addToGoal(goalId, amount);
};

const handleEditGoal = (
  goalId: number,
  destinationSum: number,
  title: string,
  description: string
) => {
  store.editGoal(goalId, destinationSum, title, description);
};

onMounted(() => {
  if (route.query.showModal === "true") {
    goalForm.open();
    router.replace({ query: {} });
  }
});
</script>

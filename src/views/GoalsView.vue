<template>
  <div class="px-4">
    <div class="fixed w-full bg-white h-[50px] flex items-center">
      <h3 class="text-3xl">Цели</h3>
    </div>

    <div class="pt-[50px] flex flex-col gap-2">
      <GoalItem v-for="goal in store.goals" :key="goal.id" :goal="goal" />
    </div>

    <Button
      class="fixed z-3 bottom-[100px] right-4 left-4 py-4 bg-green-600 text-xl font-medium text-white"
      v-if="!modalForm.isVisible.value"
      @click="modalForm.open"
      >Добавить</Button
    >

    <ModalWrapper
      :isVisible="modalForm.isVisible.value"
      @close="modalForm.close"
    >
      <GoalForm @close="modalForm.close" />
    </ModalWrapper>
  </div>
</template>

<script setup lang="ts">
import { useModal } from "@/composables/useModal";
import { useGoals } from "@/store/useGoalsStore";
import ModalWrapper from "@/components/ModalWrapper.vue";
import GoalForm from "@/components/GoalForm.vue";
import GoalItem from "@/components/GoalItem.vue";

const store = useGoals();
const modalForm = useModal();
</script>

<template>
  <div>
    <div v-if="store.goals.length > 0">
      <div class="px-4 flex justify-between items-center text-xl font-bold">
        <h3 class="bg-white h-[50px] flex items-center">Цели</h3>

        <p>{{ store.goals.length }}</p>
      </div>

      <div class="py-2 overflow-x-scroll">
        <div class="flex gap-2 w-fit px-4">
          <DashboardGoalItem
            v-for="goal in store.goals"
            :key="goal.id"
            :goal="goal"
            class="w-[180px]"
          />
        </div>
      </div>
    </div>

    <div v-else class="px-4 mt-2">
      <div
        class="px-2 pb-2 pt-2 bg-gray-100 rounded-xl flex flex-col justify-center items-center gap-3"
      >
        <h3 class="flex items-center text-xl font-bold text-center">
          У вас нет целей
        </h3>
        <Button
          @click="addGoal"
          class="bg-green-600 px-3 py-2 text-xl text-white w-full"
          >Добавить</Button
        >
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import DashboardGoalItem from "./DashboardGoalItem.vue";
import { useGoalsStore } from "@/store/useGoalsStore";
import { useRouter } from "vue-router";

const store = useGoalsStore();
const router = useRouter();

const addGoal = () => {
  router.push({
    path: "/goals",
    query: { showModal: "true" },
  });
};
</script>

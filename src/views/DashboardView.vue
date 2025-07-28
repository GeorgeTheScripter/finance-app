<template>
  <div class="">
    <div class="px-4 fixed w-full bg-white h-[50px] flex items-center">
      <h3 class="text-3xl">Статистика за {{ store.currentMonthText }}</h3>
    </div>

    <div class="px-4 pt-[60px] flex gap-2 w-full">
      <DashboardTabloid
        :title="'Общий доход'"
        :color="'bg-green-100'"
        :sum="store.totalIncome"
        :data="store.chartInfo.income"
        @openModal="openChartModel"
      />

      <DashboardTabloid
        :title="'Общий расход'"
        :color="'bg-red-100'"
        :sum="store.totalExpense"
        :data="store.chartInfo.expense"
        @openModal="openChartModel"
      />
    </div>

    <div>
      <div class="px-4 flex justify-between items-center text-xl font-bold">
        <h3 class="sticky top-[90px] bg-white z-2 h-[50px] flex items-center">
          Цели
        </h3>

        <p>{{ goalsStore.goals.length }}</p>
      </div>

      <div class="py-2 overflow-x-scroll">
        <div class="flex gap-2 w-fit px-4">
          <DashboardGoalItem
            v-for="goal in goalsStore.goals"
            :key="goal.id"
            :goal="goal"
            class="w-[180px]"
          />
        </div>
      </div>
    </div>

    <div class="px-4 pb-[120px]">
      <div class="flex justify-between items-center text-xl font-bold">
        <h3 class="sticky top-[90px] bg-white z-2 h-[50px] flex items-center">
          История
        </h3>
      </div>

      <div class="flex flex-col gap-2">
        <DashboardStoryItem
          v-for="transaction in store.currentMonthTransactions"
          :key="transaction.id"
          :transaction="transaction"
        />
      </div>
    </div>

    <ModalWrapper :isVisible="modal.isVisible.value" @close="modal.close">
      <DashboardChart v-if="selectedData" class="w-full" :data="selectedData" />
    </ModalWrapper>
  </div>
</template>

<script setup lang="ts">
import DashboardGoalItem from "@/components/DashboardGoalItem.vue";
import DashboardTabloid from "@/components/DashboardTabloid.vue";
import DashboardChart from "@/components/DashboardChart.vue";
import ModalWrapper from "@/components/ModalWrapper.vue";
import { useModal } from "@/composables/useModal";
import { useDashboardStore } from "@/store/useDashboardStore";
import { useGoalsStore } from "@/store/useGoalsStore";
import { DataItem } from "@/types/transactions";
import { ref } from "vue";
import DashboardStoryItem from "@/components/DashboardStoryItem.vue";

const store = useDashboardStore();
const modal = useModal();
const goalsStore = useGoalsStore();
const selectedData = ref<DataItem[] | null>(null);

const openChartModel = (data: DataItem[]) => {
  selectedData.value = data;
  modal.open();
};
</script>

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

    <DashboardGoalsList />
    <DashboardStoryList />

    <ModalWrapper :isVisible="modal.isVisible.value" @close="modal.close">
      <DashboardChart v-if="selectedData" class="w-full" :data="selectedData" />
    </ModalWrapper>
  </div>
</template>

<script setup lang="ts">
import DashboardTabloid from "@/components/DashboardTabloid.vue";
import DashboardChart from "@/components/DashboardChart.vue";
import ModalWrapper from "@/components/ModalWrapper.vue";
import { useModal } from "@/composables/useModal";
import { useDashboardStore } from "@/store/useDashboardStore";
import { DataItem } from "@/types/transactions";
import { ref } from "vue";
import DashboardGoalsList from "@/components/DashboardGoalsList.vue";
import DashboardStoryList from "@/components/DashboardStoryList.vue";

const store = useDashboardStore();
const modal = useModal();
const selectedData = ref<DataItem[] | null>(null);

const openChartModel = (data: DataItem[]) => {
  selectedData.value = data;
  modal.open();
};
</script>

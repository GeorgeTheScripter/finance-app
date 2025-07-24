<template>
  <div class="px-4">
    <div class="fixed w-full bg-white h-[50px] flex items-center">
      <h3 class="text-3xl">Статистика</h3>
    </div>

    <div class="pt-[60px] pb-[120px] flex flex-col gap-2">
      <DashboardTabloid
        :title="'Общий доход'"
        :color="'bg-green-100'"
        :sum="store.totalIncome"
        :data="store.chartIncome"
      />

      <DashboardTabloid
        :title="'Общий расход'"
        :color="'bg-red-100'"
        :sum="store.totalExpense"
        :data="store.chartExpense"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import DashboardTabloid from "@/components/DashboardTabloid.vue";
import { useDashboardStore } from "@/store/useDashboardStore";

const store = useDashboardStore();
</script>

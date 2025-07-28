<template>
  <div class="px-4">
    <div class="fixed w-full bg-white h-[50px] flex items-center">
      <h3 class="text-3xl">Сводка</h3>
    </div>

    <div class="pt-[50px] flex flex-col gap-6">
      <div class="h-[300px] flex flex-col gap-2">
        <div class="flex justify-between items-center text-xl font-bold">
          <h3 class="flex items-center">Расходы</h3>
        </div>
        <div class="p-2 h-full bg-red-100 rounded-xl">
          <ReportChart
            :data="store.dailyExpense"
            :color="'#eb1515'"
            class="h-full"
          />
        </div>
      </div>

      <div class="h-[300px] flex flex-col gap-2">
        <div class="flex justify-between items-center text-xl font-bold">
          <h3 class="flex items-center">Доходы</h3>
        </div>
        <div class="p-2 h-full bg-green-100 rounded-xl">
          <ReportChart
            :data="store.dailyIncome"
            :color="'#098219'"
            class="h-full"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import ReportChart from "@/components/ReportChart.vue";
import { useReportStore } from "@/store/useReportStore";
const store = useReportStore();
</script>

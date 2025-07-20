<template>
  <div>
    <div class="px-4 fixed w-full bg-white h-[50px] flex items-center">
      <h3 class="text-3xl">Статистика</h3>
    </div>

    <div class="pt-[60px] px-4 flex flex-col gap-2">
      <div class="rounded-xl bg-green-600 pt-[60px] px-4 pb-4 text-white">
        <p class="text-xl">Общий доход</p>
        <h4 class="text-3xl">{{ store.totalIncome }} ₽</h4>
      </div>

      <div class="rounded-xl bg-red-600 pt-[60px] px-4 pb-4 text-white">
        <p class="text-xl">Общий расход</p>
        <h4 class="text-3xl">{{ store.totalExpense }} ₽</h4>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useDashboardStore } from "@/store/useDashboardStore";

const store = useDashboardStore();
</script>

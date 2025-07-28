<template>
  <div>
    <div
      v-if="store.currentMonthTransactions.length > 0"
      class="px-4 pb-[120px]"
    >
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

    <div v-else>Нет транзакций в этом месяце</div>
  </div>
</template>

<script setup lang="ts">
import { useDashboardStore } from "@/store/useDashboardStore";
import DashboardStoryItem from "./DashboardStoryItem.vue";

const store = useDashboardStore();
</script>

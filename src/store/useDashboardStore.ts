import { defineStore } from "pinia";
import { computed } from "vue";

import { useTransactionStore } from "./useTransactionStore";
import { CATEGORY_TYPE } from "@/types/transactions";

export const useDashboardStore = defineStore("dashboard", () => {
  const transStore = useTransactionStore();

  const totalIncome = computed(() => {
    return transStore.transactions
      .filter((trans) => trans.category.type === CATEGORY_TYPE.INC)
      .reduce((sum, trans) => sum + Number(trans.amount ?? 0), 0);
  });

  const totalExpense = computed(() => {
    return transStore.transactions
      .filter((trans) => trans.category.type === CATEGORY_TYPE.EXP)
      .reduce((sum, trans) => sum + Number(trans.amount ?? 0), 0);
  });

  return {
    totalIncome,
    totalExpense,
  };
});

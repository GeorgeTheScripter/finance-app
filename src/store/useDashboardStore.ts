import { defineStore } from "pinia";
import { computed } from "vue";

import { useTransactionStore } from "./useTransactionStore";
import { CATEGORY_TYPE, DataItem } from "@/types/transactions";

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

  // Доделать
  // const chartIncome = computed(() => {
  //   const grouped: Record<string, DataItem> = {};

  //   transStore.transactions.forEach((item) => {
  //     if (item.category.type === CATEGORY_TYPE.INC) {
  //       const catId = item.category.id;

  //       if (!grouped[catId]) {
  //         grouped[catId] = {
  //           category: item.category.title,
  //           color: item.category.color, // Используем цвет из категории
  //           count: 0,
  //         };
  //       }

  //       grouped[catId].count += item.amount;
  //     }
  //   });

  //   return Object.values(grouped);
  // });

  return {
    totalIncome,
    totalExpense,
    // chartIncome,
  };
});

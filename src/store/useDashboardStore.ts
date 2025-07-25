import { defineStore } from "pinia";
import { computed } from "vue";

import { useTransactionStore } from "./useTransactionStore";
import { CATEGORY_TYPE, DataItem, Transaction } from "@/types/transactions";

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

  const chartInfo = computed(() => {
    const transactions: Transaction[] = transStore.transactions;
    const incomeMap: Record<string, DataItem> = {};
    const expenseMap: Record<string, DataItem> = {};

    transactions.forEach((transaction) => {
      const category = transaction.category;
      const key = `${category.id}`; // Уникальный ключ (id категории)

      if (transaction.type === CATEGORY_TYPE.INC) {
        if (!incomeMap[key]) {
          incomeMap[key] = {
            category: category.title,
            count: 0,
            color: category.color,
          };
        }
        incomeMap[key].count! += transaction.amount;
      } else if (transaction.type === CATEGORY_TYPE.EXP) {
        if (!expenseMap[key]) {
          expenseMap[key] = {
            category: category.title,
            count: 0,
            color: category.color,
          };
        }
        expenseMap[key].count += transaction.amount;
      }
    });

    const income: DataItem[] = Object.values(incomeMap);
    const expense: DataItem[] = Object.values(expenseMap);

    return {
      income,
      expense,
    };
  });

  return {
    totalIncome,
    totalExpense,
    chartInfo,
  };
});

import { defineStore } from "pinia";
import { computed, onMounted, onUnmounted, ref } from "vue";

import { useTransactionStore } from "./useTransactionStore";
import { CATEGORY_TYPE, DataItem, Transaction } from "@/types/transactions";

export const useDashboardStore = defineStore("dashboard", () => {
  const transStore = useTransactionStore();

  const currentMonth = ref<number>(new Date().getMonth());
  const currentYear = ref<number>(new Date().getFullYear());

  const months = [
    "Январь",
    "Февраль",
    "Март",
    "Апрель",
    "Май",
    "Июнь",
    "Июль",
    "Август",
    "Сентябрь",
    "Октябрь",
    "Ноябрь",
    "Декабрь",
  ];

  const currentMonthText: string = months[currentMonth.value];

  // Проверка даты:
  let intervalID: number;

  onMounted(() => {
    intervalID = window.setInterval(() => {
      const now: Date = new Date();
      const month: number = now.getMonth();
      const year: number = now.getFullYear();

      if (month !== currentMonth.value || year !== currentYear.value) {
        currentMonth.value = month;
        currentYear.value = year;
      }
    }, 60000);
  });

  onUnmounted(() => {
    clearInterval(intervalID);
  });

  const currentMonthTransactions = computed(() => {
    return transStore.transactions.filter((trans: Transaction) => {
      const transDate = new Date(trans.date);
      return (
        transDate.getMonth() === currentMonth.value &&
        transDate.getFullYear() === currentYear.value
      );
    });
  });

  const totalIncome = computed(() => {
    return currentMonthTransactions.value
      .filter((trans) => trans.category.type === CATEGORY_TYPE.INC)
      .reduce((sum, trans) => sum + Number(trans.amount ?? 0), 0);
  });

  const totalExpense = computed(() => {
    return currentMonthTransactions.value
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
    currentMonth,
    currentYear,
    currentMonthText,
    currentMonthTransactions,
  };
});

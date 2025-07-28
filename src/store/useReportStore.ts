import { defineStore } from "pinia";
import { useTransactionStore } from "./useTransactionStore";
import { DailyDataItem, Transaction } from "@/types/transactions";
import { getDaysInMonth } from "@/utils/formatDate";
import { computed } from "vue";

export const useReportStore = defineStore("report", () => {
  const transactionStore = useTransactionStore();

  const dailyIncome = computed<DailyDataItem[]>(() => {
    return getDailyAmount("income");
  });

  const dailyExpense = computed<DailyDataItem[]>(() => {
    return getDailyAmount("expense");
  });

  const getDailyAmount = (type: "income" | "expense"): DailyDataItem[] => {
    const now: Date = new Date();
    const currentMonth: number = now.getMonth();
    const currentYear: number = now.getFullYear();

    const dailyTotals: { [day: number]: number } = {};

    const daysInMonth: number = getDaysInMonth();

    // for (let day in dailyTotals) {
    //   dailyTotals[day] = 0;
    // }

    for (let day: number = 1; day <= daysInMonth; day++) {
      dailyTotals[day] = 0;
    }

    const allTransactions: Transaction[] = transactionStore.transactions;

    allTransactions.forEach((transaction: Transaction) => {
      if (transaction.type === type) {
        const transactionDate: Date = new Date(transaction.date);

        const sameMonth: boolean = transactionDate.getMonth() === currentMonth;
        const sameYear: boolean = transactionDate.getFullYear() === currentYear;

        if (sameMonth && sameYear) {
          const day: number = transactionDate.getDate();
          dailyTotals[day] += transaction.amount;
        }
      }
    });

    const result: DailyDataItem[] = [...Array(daysInMonth)].map(
      (_, i: number): DailyDataItem => ({
        day: i + 1,
        amount: dailyTotals[i + 1],
      })
    );

    return result;
  };

  return {
    dailyIncome,
    dailyExpense,
  };
});

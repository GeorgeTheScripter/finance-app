import { defineStore } from "pinia";
import { Transaction, Goal, Category } from "@/types/financeStoreTypes";
import { ref } from "vue";

export const useFinanceStore = defineStore("financeStore", () => {
  const category = ref<Category[]>([]);
  const goal = ref<Goal[]>([]);
  const transaction = ref<Transaction[]>([]);

  return {
    category,
    goal,
    transaction,
  };
});

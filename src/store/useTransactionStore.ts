import { defineStore } from "pinia";
import { computed, ref, Ref, ComputedRef } from "vue";
import {
  Transaction,
  Category,
  RawTransaction,
  CATEGORY_TYPE,
} from "@/types/transactions";
import { formatGroupDate } from "@/utils/formatDate";

export const useTransactionStore = defineStore("transaction", () => {
  const LOCAL_STORAGE_KEY = "transactions";

  const transactions: Ref<Transaction[]> = ref([]);
  const selectedCategoriesIds: Ref<number[]> = ref([]);

  const categories: Ref<Category[]> = ref([
    { id: 1, title: "Зарплата", type: CATEGORY_TYPE.INC },
    { id: 2, title: "Находка", type: CATEGORY_TYPE.INC },
    { id: 3, title: "Кража", type: CATEGORY_TYPE.INC },
    { id: 4, title: "Подарок", type: CATEGORY_TYPE.INC },
    { id: 5, title: "Спекуляции", type: CATEGORY_TYPE.INC },

    { id: 6, title: "Коммунальные услуги", type: CATEGORY_TYPE.EXP },
    { id: 7, title: "Такси", type: CATEGORY_TYPE.EXP },
    { id: 8, title: "Продукты", type: CATEGORY_TYPE.EXP },
    { id: 9, title: "Маркетплейс", type: CATEGORY_TYPE.EXP },
    { id: 10, title: "Ресторан", type: CATEGORY_TYPE.EXP },
    { id: 11, title: "Дом", type: CATEGORY_TYPE.EXP },
    { id: 12, title: "Одежда", type: CATEGORY_TYPE.EXP },
    { id: 13, title: "Наркотики", type: CATEGORY_TYPE.EXP },
    { id: 14, title: "Аптека", type: CATEGORY_TYPE.EXP },
  ]);

  const loadFromLocalStorage = () => {
    const savedData = localStorage.getItem(LOCAL_STORAGE_KEY);

    if (savedData) {
      const parseData = JSON.parse(savedData);
      transactions.value = parseData.map((transaction: RawTransaction) => ({
        ...transaction,
        date: new Date(transaction.date),
        amount: Number(transaction.amount),
      }));
    } else {
      transactions.value = [];
    }
  };

  loadFromLocalStorage();

  const saveToLocalStorage = () => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(transactions.value));
  };

  const filteredTransactions: ComputedRef<Transaction[]> = computed(() => {
    if (selectedCategoriesIds.value.length === 0) {
      return transactions.value;
    }

    return transactions.value.filter((transaction) => {
      return selectedCategoriesIds.value.includes(transaction.category.id);
    });
  });

  const addTransaction = (newTrans: Transaction): void => {
    if (newTrans) {
      transactions.value.push(newTrans);
    }

    saveToLocalStorage();
  };

  const removeTransaction = (id: number): void => {
    transactions.value = transactions.value.filter(
      (trans: Transaction): boolean => trans.id !== id
    );

    saveToLocalStorage();
  };

  const editTransaction = (editedTrans: Transaction): void => {
    if (!editedTrans) {
      console.warn(`editedTrans is not defined`);
      return;
    }

    const index = transactions.value.findIndex(
      (trans) => trans.id === editedTrans.id
    );

    if (index === -1) {
      console.warn(`Transaction with id ${editedTrans.id} not found`);
      return;
    }

    transactions.value = [
      ...transactions.value.slice(0, index),
      editedTrans,
      ...transactions.value.slice(index + 1),
    ];

    saveToLocalStorage();
  };

  const groupedTransactions = computed(() => {
    const groups: Record<string, Transaction[]> = {};

    filteredTransactions.value.forEach((transaction) => {
      const groupKey = formatGroupDate(transaction.date);

      if (!groups[groupKey]) {
        groups[groupKey] = [];
      }

      groups[groupKey].push(transaction);
    });

    return Object.fromEntries(
      Object.entries(groups).sort(([keyA], [keyB]) => {
        const order: any = { Сегодня: 0, Вчера: 1 };
        return (order[keyA] ?? 2) - (order[keyB] ?? 2);
      })
    );
  });

  const toggleCategory = (categoryID: number) => {
    const index = selectedCategoriesIds.value.indexOf(categoryID);

    if (index >= 0) {
      selectedCategoriesIds.value.splice(index, 1);
    } else {
      selectedCategoriesIds.value.push(categoryID);
    }
  };

  const resetFilter = () => {
    selectedCategoriesIds.value = [];
  };

  return {
    transactions,
    categories,
    groupedTransactions,
    selectedCategoriesIds,

    methods: {
      addTransaction,
      removeTransaction,
      editTransaction,
      resetFilter,
      toggleCategory,
    },
  };
});
